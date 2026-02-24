// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import {
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   Package,
//   AlertTriangle,
//   TrendingUp,
//   MessageSquare,
// } from 'lucide-react';
// import useChatStore from '@/store/useChatStore';
// import toast from 'react-hot-toast';

// const Inventory = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const { addMessage, setChatPanelOpen } = useChatStore();

//   const products = [
//     {
//       id: 1,
//       name: 'Basmati Rice 5kg',
//       sku: 'BR-5KG-001',
//       stock: 45,
//       reorderLevel: 50,
//       forecast: 'High demand',
//       supplier: 'ABC Suppliers',
//       price: '₹450',
//       category: 'Groceries',
//     },
//     {
//       id: 2,
//       name: 'Amul Milk 1L',
//       sku: 'AM-1L-002',
//       stock: 120,
//       reorderLevel: 100,
//       forecast: 'Stable',
//       supplier: 'Dairy Direct',
//       price: '₹60',
//       category: 'Dairy',
//     },
//     {
//       id: 3,
//       name: 'Coca Cola 2L',
//       sku: 'CC-2L-003',
//       stock: 25,
//       reorderLevel: 40,
//       forecast: 'Low demand',
//       supplier: 'Beverage Co',
//       price: '₹90',
//       category: 'Beverages',
//     },
//     {
//       id: 4,
//       name: 'Maggi Noodles',
//       sku: 'MN-001',
//       stock: 200,
//       reorderLevel: 150,
//       forecast: 'Stable',
//       supplier: 'FMCG Distributors',
//       price: '₹20',
//       category: 'Instant Food',
//     },
//     {
//       id: 5,
//       name: 'Tata Salt 1kg',
//       sku: 'TS-1KG-005',
//       stock: 15,
//       reorderLevel: 30,
//       forecast: 'High demand',
//       supplier: 'ABC Suppliers',
//       price: '₹25',
//       category: 'Groceries',
//     },
//   ];

//   const handleAskAgent = (product) => {
//     const query = `I need insights about ${product.name}. Current stock: ${product.stock}, Reorder level: ${product.reorderLevel}. What should I do?`;
//     addMessage({
//       role: 'user',
//       content: query,
//     });
//     setChatPanelOpen(true);
//     toast.success('Query sent to AI Assistant!');
//   };

//   const getStockStatus = (stock, reorderLevel) => {
//     if (stock < reorderLevel) return 'low';
//     if (stock < reorderLevel * 1.5) return 'medium';
//     return 'high';
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.sku.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Inventory Management</h1>
//           <p className="text-muted-foreground">Manage your products and stock levels</p>
//         </div>
        
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="gap-2">
//               <Plus className="h-4 w-4" />
//               Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Product</DialogTitle>
//               <DialogDescription>Enter the details of the new product</DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label>Product Name</Label>
//                 <Input placeholder="Enter product name" />
//               </div>
//               <div className="space-y-2">
//                 <Label>SKU</Label>
//                 <Input placeholder="Enter SKU" />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Stock</Label>
//                   <Input type="number" placeholder="0" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Reorder Level</Label>
//                   <Input type="number" placeholder="0" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label>Supplier</Label>
//                 <Input placeholder="Supplier name" />
//               </div>
//               <div className="space-y-2">
//                 <Label>Price</Label>
//                 <Input placeholder="₹0" />
//               </div>
//               <Button className="w-full">Add Product</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <Package className="h-4 w-4" />
//               Total Products
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{products.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <AlertTriangle className="h-4 w-4 text-red-600" />
//               Low Stock
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">
//               {products.filter((p) => p.stock < p.reorderLevel).length}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <TrendingUp className="h-4 w-4 text-green-600" />
//               High Demand
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">
//               {products.filter((p) => p.forecast === 'High demand').length}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Value
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">₹2,45,600</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filter */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products by name or SKU..."
//                 className="pl-10"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Button variant="outline">Filter</Button>
//             <Button variant="outline">Export</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Products</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead>SKU</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Forecast</TableHead>
//                 <TableHead>Supplier</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredProducts.map((product, index) => {
//                 const stockStatus = getStockStatus(product.stock, product.reorderLevel);
//                 return (
//                   <motion.tr
//                     key={product.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="group"
//                   >
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{product.name}</div>
//                         <div className="text-xs text-muted-foreground">{product.category}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="font-mono text-xs">{product.sku}</TableCell>
//                     <TableCell>
//                       <div className="font-semibold">{product.stock}</div>
//                       <div className="text-xs text-muted-foreground">
//                         Reorder: {product.reorderLevel}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           stockStatus === 'low'
//                             ? 'destructive'
//                             : stockStatus === 'medium'
//                             ? 'default'
//                             : 'secondary'
//                         }
//                       >
//                         {stockStatus === 'low'
//                           ? 'Low Stock'
//                           : stockStatus === 'medium'
//                           ? 'Normal'
//                           : 'Good'}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={product.forecast === 'High demand' ? 'default' : 'outline'}
//                       >
//                         {product.forecast}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-sm">{product.supplier}</TableCell>
//                     <TableCell className="font-semibold">{product.price}</TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Button size="icon" variant="ghost" className="h-8 w-8">
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           className="h-8 w-8"
//                           onClick={() => handleAskAgent(product)}
//                         >
//                           <MessageSquare className="h-4 w-4" />
//                         </Button>
//                         <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </motion.tr>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Inventory;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import useChatStore from '@/store/useChatStore';
import toast from 'react-hot-toast';

// Import your new APIs
import { getInventory, addProduct, deleteProduct } from '../../api/inventory';
import { getVendors } from '../../api/vendors';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state for adding a product
  const [newProduct, setNewProduct] = useState({
    productName: '',
    stock: '',
    price: '',
    vendorId: ''
  });

  const { addMessage, setChatPanelOpen } = useChatStore();

  // Load Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [inventoryData, vendorsData] = await Promise.all([
        getInventory(),
        getVendors()
      ]);
      setProducts(inventoryData);
      setVendors(vendorsData);
    } catch (error) {
      toast.error('Failed to load inventory data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get vendor name from vendorId
  const getVendorName = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : 'Unknown Supplier';
  };

  // Handlers
  const handleAddProduct = async () => {
    if (!newProduct.productName || !newProduct.price || !newProduct.stock || !newProduct.vendorId) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await addProduct(newProduct);
      toast.success('Product added successfully!');
      setIsDialogOpen(false);
      setNewProduct({ productName: '', stock: '', price: '', vendorId: '' });
      fetchData(); // Refresh list
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleAskAgent = (product) => {
    const query = `I need insights about ${product.productName}. Current stock: ${product.stock}. What should I do?`;
    addMessage({ role: 'user', content: query });
    setChatPanelOpen(true);
    toast.success('Query sent to AI Assistant!');
  };

  // Filtering & Computed Stats
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) * Number(p.stock)), 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your products and stock levels</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Enter the details of the new product</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input 
                  placeholder="Enter product name" 
                  value={newProduct.productName}
                  onChange={(e) => setNewProduct({...newProduct, productName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Supplier</Label>
                <select 
                  className="w-full p-2 border rounded-md bg-background"
                  value={newProduct.vendorId}
                  onChange={(e) => setNewProduct({...newProduct, vendorId: e.target.value})}
                >
                  <option value="">Select a supplier...</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <Button className="w-full" onClick={handleAddProduct}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Low Stock ({"<"}10)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {lowStockCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {outOfStockCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading inventory...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => {
                  const stockStatus = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'good';
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="font-medium">{product.productName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{product.stock}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            stockStatus === 'out' ? 'destructive' : stockStatus === 'low' ? 'outline' : 'secondary'
                          }
                        >
                          {stockStatus === 'out' ? 'Out of Stock' : stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{getVendorName(product.vendorId)}</TableCell>
                      <TableCell className="font-semibold">₹{product.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleAskAgent(product)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
