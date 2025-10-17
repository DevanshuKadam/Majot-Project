import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import useChatStore from '@/store/useChatStore';
import toast from 'react-hot-toast';

const Insights = () => {
  const { addMessage, setChatPanelOpen } = useChatStore();

  const salesTrend = [
    { month: 'Jan', sales: 45000, forecast: 46000 },
    { month: 'Feb', sales: 52000, forecast: 51000 },
    { month: 'Mar', sales: 48000, forecast: 49000 },
    { month: 'Apr', sales: 61000, forecast: 58000 },
    { month: 'May', sales: 55000, forecast: 56000 },
    { month: 'Jun', sales: 67000, forecast: 65000 },
  ];

  const stockTrend = [
    { week: 'Week 1', inStock: 340, lowStock: 12 },
    { week: 'Week 2', inStock: 335, lowStock: 15 },
    { week: 'Week 3', inStock: 342, lowStock: 8 },
    { week: 'Week 4', inStock: 338, lowStock: 10 },
  ];

  const productDemand = [
    { product: 'Rice', demand: 156 },
    { product: 'Milk', demand: 248 },
    { product: 'Cola', demand: 89 },
    { product: 'Maggi', demand: 234 },
    { product: 'Salt', demand: 145 },
  ];

  const forecastData = [
    { day: 'Mon', actual: 4000, predicted: 4200 },
    { day: 'Tue', actual: 3000, predicted: 3100 },
    { day: 'Wed', actual: 5000, predicted: 4800 },
    { day: 'Thu', actual: 4500, predicted: 4600 },
    { day: 'Fri', actual: 6000, predicted: 5800 },
    { day: 'Sat', actual: 5500, predicted: 5600 },
    { day: 'Sun', actual: 4800, predicted: 5000 },
  ];

  const aiInsights = [
    {
      id: 1,
      title: 'Stock Optimization Opportunity',
      description: 'You can reduce inventory costs by 15% by optimizing reorder points for 12 products.',
      impact: 'high',
      time: '2 hours ago',
      status: 'new',
    },
    {
      id: 2,
      title: 'Demand Surge Predicted',
      description: 'AI forecasts 25% increase in soft drink sales next week due to local festival.',
      impact: 'high',
      time: '5 hours ago',
      status: 'new',
    },
    {
      id: 3,
      title: 'Supplier Price Change',
      description: 'ABC Suppliers increased rice prices by 8%. Consider alternative suppliers.',
      impact: 'medium',
      time: '1 day ago',
      status: 'reviewed',
    },
    {
      id: 4,
      title: 'Customer Buying Pattern',
      description: 'Evening sales are 30% higher than morning. Consider staffing adjustments.',
      impact: 'medium',
      time: '2 days ago',
      status: 'reviewed',
    },
    {
      id: 5,
      title: 'Seasonal Trend Alert',
      description: 'Historical data shows 40% increase in cold drinks demand starting next month.',
      impact: 'low',
      time: '3 days ago',
      status: 'archived',
    },
  ];

  const handleChartClick = (chartName) => {
    const query = `Can you analyze the ${chartName} chart and give me detailed insights?`;
    addMessage({
      role: 'user',
      content: query,
    });
    setChatPanelOpen(true);
    toast.success('Analysis request sent to AI!');
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Sparkles className="h-4 w-4 text-yellow-600" />;
      case 'reviewed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'archived':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Insights & Analytics</h1>
        <p className="text-muted-foreground">Data-driven insights to grow your business</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend vs Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleChartClick('Sales Trend vs Forecast')}
          >
            <CardHeader>
              <CardTitle>Sales Trend vs AI Forecast</CardTitle>
              <CardDescription>Compare actual sales with AI predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Actual Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="AI Forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Demand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleChartClick('Product Demand')}
          >
            <CardHeader>
              <CardTitle>Top Product Demand</CardTitle>
              <CardDescription>Most in-demand products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={productDemand}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stock Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleChartClick('Stock Status')}
          >
            <CardHeader>
              <CardTitle>Stock Status Trend</CardTitle>
              <CardDescription>In-stock vs low-stock items over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={stockTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="inStock"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    name="In Stock"
                  />
                  <Area
                    type="monotone"
                    dataKey="lowStock"
                    stackId="1"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    name="Low Stock"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Forecast Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleChartClick('Forecast Accuracy')}
          >
            <CardHeader>
              <CardTitle>Forecast Accuracy</CardTitle>
              <CardDescription>How accurate are AI predictions?</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights Feed
              </CardTitle>
              <CardDescription>Real-time recommendations from AI agents</CardDescription>
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="shrink-0 pt-1">{getStatusIcon(insight.status)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                    </div>
                    <Badge variant={getImpactColor(insight.impact)}>{insight.impact}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {insight.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            Load More Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
