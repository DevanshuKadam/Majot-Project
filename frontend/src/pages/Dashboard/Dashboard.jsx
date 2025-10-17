import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useChatStore from '@/store/useChatStore';

const Dashboard = () => {
  const { shopInfo } = useChatStore();

  const stats = [
    {
      title: "Today's Sales",
      value: '₹45,231',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '124',
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Low Stock Items',
      value: '8',
      change: '+2',
      trend: 'down',
      icon: AlertTriangle,
    },
    {
      title: 'Active Products',
      value: '342',
      change: '+15',
      trend: 'up',
      icon: Package,
    },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 4500 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 5500 },
    { name: 'Sun', sales: 4800 },
  ];

  const topProducts = [
    { name: 'Basmati Rice 5kg', sales: 156, revenue: '₹23,400' },
    { name: 'Amul Milk 1L', sales: 248, revenue: '₹12,400' },
    { name: 'Coca Cola 2L', sales: 89, revenue: '₹7,120' },
    { name: 'Maggi Noodles', sales: 234, revenue: '₹4,680' },
  ];

  const aiRecommendations = [
    {
      title: 'Restock Alert',
      description: 'Basmati Rice running low. Forecast shows 30% demand increase next week.',
      priority: 'high',
    },
    {
      title: 'Price Optimization',
      description: 'Competitor analysis suggests 5% price reduction on soft drinks.',
      priority: 'medium',
    },
    {
      title: 'Supplier Deal',
      description: 'Best price available from Supplier X for bulk wheat order.',
      priority: 'low',
    },
  ];

  const tasks = [
    { id: 1, text: 'Review supplier quotes for rice', completed: false },
    { id: 2, text: 'Update prices for 15 products', completed: false },
    { id: 3, text: 'Check delivery status from Supplier Y', completed: true },
    { id: 4, text: 'Approve AI-generated purchase order', completed: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {shopInfo.owner}! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your store today</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: Just now
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">from last week</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best sellers this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Smart insights for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="shrink-0">
                    <Badge
                      variant={
                        rec.priority === 'high'
                          ? 'destructive'
                          : rec.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Insights
            </Button>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Things to complete</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Checkbox defaultChecked={task.completed} />
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.text}
                  </span>
                  {task.completed && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Add New Task
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
