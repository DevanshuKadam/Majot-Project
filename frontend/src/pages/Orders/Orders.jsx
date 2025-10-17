import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShoppingCart,
  Truck,
  Users,
  Phone,
  Mail,
  Star,
  MessageSquare,
  Clock,
} from 'lucide-react';
import useChatStore from '@/store/useChatStore';
import toast from 'react-hot-toast';

const Orders = () => {
  const { addMessage, setChatPanelOpen } = useChatStore();

  const purchaseOrders = [
    {
      id: 'PO-001',
      supplier: 'ABC Suppliers',
      date: '2024-01-15',
      status: 'Pending',
      total: '₹45,600',
      items: 12,
      notes: 'Urgent delivery required',
    },
    {
      id: 'PO-002',
      supplier: 'Dairy Direct',
      date: '2024-01-14',
      status: 'Confirmed',
      total: '₹23,400',
      items: 8,
      notes: 'Weekly order',
    },
    {
      id: 'PO-003',
      supplier: 'Beverage Co',
      date: '2024-01-13',
      status: 'Delivered',
      total: '₹12,800',
      items: 15,
      notes: '',
    },
    {
      id: 'PO-004',
      supplier: 'FMCG Distributors',
      date: '2024-01-12',
      status: 'Cancelled',
      total: '₹8,900',
      items: 6,
      notes: 'Price too high',
    },
  ];

  const suppliers = [
    {
      id: 1,
      name: 'ABC Suppliers',
      rating: 4.5,
      phone: '+91 98765 43210',
      email: 'contact@abcsuppliers.com',
      leadTime: '2-3 days',
      totalOrders: 45,
      specialty: 'Groceries & Essentials',
    },
    {
      id: 2,
      name: 'Dairy Direct',
      rating: 4.8,
      phone: '+91 98765 43211',
      email: 'orders@dairydirect.com',
      leadTime: '1 day',
      totalOrders: 120,
      specialty: 'Dairy Products',
    },
    {
      id: 3,
      name: 'Beverage Co',
      rating: 4.2,
      phone: '+91 98765 43212',
      email: 'sales@beverageco.com',
      leadTime: '3-4 days',
      totalOrders: 32,
      specialty: 'Soft Drinks & Beverages',
    },
    {
      id: 4,
      name: 'FMCG Distributors',
      rating: 4.6,
      phone: '+91 98765 43213',
      email: 'info@fmcg.com',
      leadTime: '2 days',
      totalOrders: 67,
      specialty: 'Fast Moving Consumer Goods',
    },
  ];

  const deliveries = [
    {
      id: 'DEL-001',
      poId: 'PO-002',
      supplier: 'Dairy Direct',
      scheduled: '2024-01-16 10:00 AM',
      status: 'In Transit',
      tracking: 'TRK123456789',
    },
    {
      id: 'DEL-002',
      poId: 'PO-001',
      supplier: 'ABC Suppliers',
      scheduled: '2024-01-17 2:00 PM',
      status: 'Scheduled',
      tracking: 'TRK987654321',
    },
  ];

  const handleNegotiate = (supplier) => {
    const query = `I want to negotiate better prices with ${supplier.name}. Can you help me draft a negotiation strategy?`;
    addMessage({
      role: 'user',
      content: query,
    });
    setChatPanelOpen(true);
    toast.success('Negotiation request sent to AI Agent!');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'default';
      case 'confirmed':
        return 'secondary';
      case 'delivered':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      case 'in transit':
        return 'default';
      case 'scheduled':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders & Suppliers</h1>
        <p className="text-muted-foreground">Manage purchase orders and supplier relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4" />
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹82,800</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
        </TabsList>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Track and manage your purchase orders</CardDescription>
              </div>
              <Button>Create New Order</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell className="font-mono font-semibold">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{order.total}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.notes || '-'}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        <CardDescription>{supplier.specialty}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{supplier.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Lead Time: {supplier.leadTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary">{supplier.totalOrders} orders</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => handleNegotiate(supplier)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Negotiate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Deliveries Tab */}
        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Deliveries</CardTitle>
              <CardDescription>Track incoming shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery, index) => (
                    <motion.tr
                      key={delivery.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell className="font-mono font-semibold">{delivery.id}</TableCell>
                      <TableCell className="font-mono">{delivery.poId}</TableCell>
                      <TableCell>{delivery.supplier}</TableCell>
                      <TableCell>{delivery.scheduled}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{delivery.tracking}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
