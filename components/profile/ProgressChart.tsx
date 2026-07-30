"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";

interface ProgressChartProps { title: string; description: string; data: Array<{ date: string; value?: number; volume?: number; weight?: number }>; dataKey: "value" | "volume" | "weight"; unit: string; }

export function ProgressChart({ title, description, data, dataKey, unit }: ProgressChartProps) {
  return <Card title={title} description={description} className="min-h-80">{data.length ? <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} /><XAxis dataKey="date" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px" }} labelStyle={{ color: "#d4d4d8" }} formatter={(value) => [`${Number(value).toFixed(1)} ${unit}`, title]} /><Line type="monotone" dataKey={dataKey} stroke="#a3e635" strokeWidth={2.5} dot={{ r: 3, fill: "#a3e635" }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer></div> : <div className="flex h-56 items-center justify-center text-sm text-zinc-500">No progress data yet.</div>}</Card>;
}
