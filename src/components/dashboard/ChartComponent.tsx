
import { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const dailyData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 59 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 81 },
  { name: "Fri", value: 56 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 45 },
];

const weeklyData = [
  { name: "Week 1", value: 200 },
  { name: "Week 2", value: 300 },
  { name: "Week 3", value: 250 },
  { name: "Week 4", value: 400 },
];

const monthlyData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 900 },
  { name: "Mar", value: 1300 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 1600 },
];

const pieData = [
  { name: "Emails", value: 400, color: "#0d9488" },
  { name: "Documents", value: 300, color: "#4f46e5" },
  { name: "Reports", value: 200, color: "#9333ea" },
  { name: "Notifications", value: 100, color: "#dc2626" },
];

type ChartType = "area" | "bar" | "line" | "pie";
type TimeRange = "daily" | "weekly" | "monthly";

interface ChartComponentProps {
  title: string;
  description?: string;
  type?: ChartType;
  showTimeSelector?: boolean;
  className?: string;
}

export function ChartComponent({
  title,
  description,
  type = "area",
  showTimeSelector = true,
  className,
}: ChartComponentProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");
  const [data, setData] = useState(dailyData);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update data based on time range
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => {
      switch (timeRange) {
        case "daily":
          setData(dailyData);
          break;
        case "weekly":
          setData(weeklyData);
          break;
        case "monthly":
          setData(monthlyData);
          break;
      }
      setIsUpdating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange]);

  // Chart colors
  const primaryColor = "#0d9488";
  const secondaryColor = "#0f766e";

  // Render chart based on type
  const renderChart = () => {
    if (isUpdating) {
      return (
        <div className="flex items-center justify-center h-60">
          <div className="animate-pulse-slow text-muted-foreground">
            Updating...
          </div>
        </div>
      );
    }

    switch (type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  borderColor: "#334155",
                  color: "#f8fafc"
                }} 
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={primaryColor}
                fill={primaryColor}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  borderColor: "#334155",
                  color: "#f8fafc"
                }} 
              />
              <Bar dataKey="value" fill={primaryColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  borderColor: "#334155",
                  color: "#f8fafc"
                }} 
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={primaryColor}
                strokeWidth={2}
                dot={{ r: 4, fill: primaryColor }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  borderColor: "#334155",
                  color: "#f8fafc"
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {showTimeSelector && type !== "pie" && (
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as TimeRange)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
