import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
} from 'lucide-react';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: '🤖 Inventory Agent' },
    position: { x: 250, y: 50 },
    style: {
      background: 'hsl(var(--primary))',
      color: 'white',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '12px',
      padding: '10px',
    },
  },
  {
    id: '2',
    type: 'default',
    data: { label: '📊 Forecast Agent' },
    position: { x: 100, y: 150 },
    style: {
      background: 'hsl(var(--secondary))',
      color: 'white',
      border: '2px solid hsl(var(--secondary))',
      borderRadius: '12px',
      padding: '10px',
    },
  },
  {
    id: '3',
    type: 'default',
    data: { label: '🤝 Supplier Agent' },
    position: { x: 400, y: 150 },
    style: {
      background: 'hsl(221 83% 53%)',
      color: 'white',
      border: '2px solid hsl(221 83% 53%)',
      borderRadius: '12px',
      padding: '10px',
    },
  },
  {
    id: '4',
    type: 'default',
    data: { label: '💰 Pricing Agent' },
    position: { x: 100, y: 250 },
    style: {
      background: 'hsl(142 76% 36%)',
      color: 'white',
      border: '2px solid hsl(142 76% 36%)',
      borderRadius: '12px',
      padding: '10px',
    },
  },
  {
    id: '5',
    type: 'default',
    data: { label: '📈 Analytics Agent' },
    position: { x: 400, y: 250 },
    style: {
      background: 'hsl(25 95% 53%)',
      color: 'white',
      border: '2px solid hsl(25 95% 53%)',
      borderRadius: '12px',
      padding: '10px',
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
];

const Agents = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const agents = [
    {
      id: 1,
      name: 'Inventory Agent',
      icon: Package,
      status: 'active',
      lastActive: '2 mins ago',
      tasksCompleted: 45,
      description: 'Monitoring stock levels and generating reorder recommendations',
    },
    {
      id: 2,
      name: 'Forecast Agent',
      icon: TrendingUp,
      status: 'active',
      lastActive: '5 mins ago',
      tasksCompleted: 32,
      description: 'Analyzing sales trends and predicting future demand',
    },
    {
      id: 3,
      name: 'Supplier Agent',
      icon: Users,
      status: 'idle',
      lastActive: '1 hour ago',
      tasksCompleted: 28,
      description: 'Managing supplier relationships and negotiating prices',
    },
    {
      id: 4,
      name: 'Pricing Agent',
      icon: DollarSign,
      status: 'active',
      lastActive: '10 mins ago',
      tasksCompleted: 19,
      description: 'Optimizing product prices based on market conditions',
    },
    {
      id: 5,
      name: 'Analytics Agent',
      icon: BarChart3,
      status: 'active',
      lastActive: '3 mins ago',
      tasksCompleted: 56,
      description: 'Generating insights from business data',
    },
  ];

  const activityLogs = [
    {
      id: 1,
      agent: 'Inventory Agent',
      action: 'Detected low stock for Basmati Rice 5kg',
      timestamp: '2 mins ago',
      status: 'success',
    },
    {
      id: 2,
      agent: 'Forecast Agent',
      action: 'Predicted 25% sales increase for next week',
      timestamp: '5 mins ago',
      status: 'success',
    },
    {
      id: 3,
      agent: 'Pricing Agent',
      action: 'Optimized prices for 12 products',
      timestamp: '10 mins ago',
      status: 'success',
    },
    {
      id: 4,
      agent: 'Analytics Agent',
      action: 'Generated weekly performance report',
      timestamp: '15 mins ago',
      status: 'success',
    },
    {
      id: 5,
      agent: 'Supplier Agent',
      action: 'Negotiation failed with Supplier X',
      timestamp: '1 hour ago',
      status: 'error',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <p className="text-muted-foreground">Monitor and manage your AI agents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Total Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {agents.filter((a) => a.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Network</CardTitle>
          <CardDescription>Visualize how AI agents interact with each other</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* Agent Cards and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Status</CardTitle>
            <CardDescription>Current state of all AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        agent.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900'
                          : 'bg-muted'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          agent.status === 'active' ? 'text-green-600' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{agent.name}</h4>
                        <Badge
                          variant={agent.status === 'active' ? 'default' : 'secondary'}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {agent.lastActive}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {agent.tasksCompleted} tasks
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Recent agent actions and events</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 pb-4 border-b last:border-b-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      log.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{log.agent}</p>
                        <p className="text-sm text-muted-foreground mt-1">{log.action}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agents;
