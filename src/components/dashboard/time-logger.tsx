"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Play, Square } from "lucide-react";

export function TimeLogger() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleClockIn = () => {
    setIsClockedIn(true);
    startTimeRef.current = Date.now() - elapsedTime * 1000;
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Optionally reset timer on clock out, or keep for records
    // setElapsedTime(0); 
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">Daily Time Log</CardTitle>
            <CardDescription>
              Track your work hours for the day.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="text-5xl font-bold font-mono tracking-tighter text-foreground">
          {formatTime(elapsedTime)}
        </div>
        <div className="flex justify-center gap-4">
          {!isClockedIn ? (
            <Button onClick={handleClockIn} className="w-full bg-green-500 hover:bg-green-600 text-white">
              <Play className="mr-2 h-4 w-4" /> Clock In
            </Button>
          ) : (
            <Button onClick={handleClockOut} variant="destructive" className="w-full">
              <Square className="mr-2 h-4 w-4" /> Clock Out
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
