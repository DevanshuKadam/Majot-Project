import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TrendingUp, ShoppingBag, DollarSign, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { getCustomerSales, addCustomerSale, deleteCustomerSale } from '../../api/customerSales';

const CustomerSales = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newSale, setNewSale] = useState({
    productname: '',
    productId: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setIsLoading(true);
    try {
      const data = await getCustomerSales();
      setSales(data);
    } catch (error) {
      toast.error('Failed to load sales data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSale = async () => {
    if (!newSale.productname || !newSale.quantity || !newSale.price) {
      toast.error('Please fill in required fields');
      return;
    }
    try {
      await addCustomerSale(newSale);
      toast.success('Sale recorded successfully!');
      setIsDialogOpen(false);
      setNewSale({ productname: '', productId: '', quantity: '', price: '' });
      fetchSales();
    } catch (error) {
      toast.error('Failed to record sale');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomerSale(id);
      setSales(sales.filter(s => s.id !== id));
      toast.success('Sale record deleted');
    } catch (error) {
      toast.error('Failed to delete sale');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    if (timestamp._seconds) return new Date(timestamp._seconds * 1000).toLocaleString();
    return new Date(timestamp).toLocaleString();
  };

  const totalRevenue = sales.reduce((sum, s) => sum + (Number(s.price) * Number(s.quantity)), 0);
  const totalItemsSold = sales.reduce((sum, s) => sum + Number(s.quantity), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Ledger</h1>
          <p className="text-muted-foreground">Track customer purchases and revenue</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Record Sale</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Manual Sale Entry</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input 
                  value={newSale.productname}
                  onChange={(e) => setNewSale({...newSale, productname: e.target.value})}
                  placeholder="e.g., Maggi Noodles" 
                />
              </div>
              <div className="space-y-2">
                <Label>Product ID (Optional)</Label>
                <Input 
                  value={newSale.productId}
                  onChange={(e) => setNewSale({...newSale, productId: e.target.value})}
                  placeholder="e.g., maggi002" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" value={newSale.quantity} onChange={(e) => setNewSale({...newSale, quantity: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Unit Price (₹)</Label>
                  <Input type="number" value={newSale.price} onChange={(e) => setNewSale({...newSale, price: e.target.value})} />
                </div>
              </div>
              <Button className="w-full" onClick={handleAddSale}>Save Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex gap-2"><DollarSign className="h-4 w-4"/> Total Revenue</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-500">₹{totalRevenue.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex gap-2"><ShoppingBag className="h-4 w-4"/> Items Sold</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalItemsSold}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex gap-2"><TrendingUp className="h-4 w-4"/> Total Transactions</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{sales.length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? <p className="text-center text-muted-foreground py-4">Loading sales...</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale, i) => (
                  <motion.tr key={sale.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(sale.timestamp)}</TableCell>
                    <TableCell className="font-medium">{sale.productname} <span className="text-xs text-muted-foreground block">{sale.productId}</span></TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>₹{sale.price}</TableCell>
                    <TableCell className="font-bold">₹{Number(sale.price) * Number(sale.quantity)}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(sale.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSales;