"use client";
import Image from "next/image";
import { addDays, format, isToday } from "date-fns";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import Header from "@/components/Header";
import EditWorkdayDialog from "@/components/EditWorkdayDialog";
import { Workday } from "@/types/Workday";
import EditPatternOffsetDialog from "@/components/EditPatternOffsetDialog";

export default function Home() {
  const [workdays, setWorkdays] = useState<Workday[]>([]);
  const [viewingMonth, setViewingMonth] = useState(new Date().getMonth());
  const [isEditWorkdayDialogVisible, setIsEditWorkdayDialogVisible] = useState(false);
  const [isEditPatternOffsetDialogVisible, setIsEditPatternOffsetDialogVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [patternOffset, setPatternOffset] = useState<number>(0);

  useEffect(() => {
    const storedPatternOffset = localStorage.getItem("patternOffset");
    if (storedPatternOffset === null) {
      return;
    } 

    setPatternOffset(JSON.parse(storedPatternOffset));
  }, []);

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header
        viewingMonthIndex={viewingMonth}
        setViewingMonthIndex={setViewingMonth}
        patternOffset={patternOffset}
        setPatternOffset={setPatternOffset}
        setIsEditPatternOffsetDialogVisible={setIsEditPatternOffsetDialogVisible}
      />

      <Calendar
        viewingMonth={viewingMonth}
        workdays={workdays}
        setWorkdays={setWorkdays}
        setIsEditWorkdayDialogVisible={setIsEditWorkdayDialogVisible}
        setSelectedDate={setSelectedDate}
        patternOffset={patternOffset}
      />

      {isEditWorkdayDialogVisible &&
        <EditWorkdayDialog
          onClose={() => setIsEditWorkdayDialogVisible(false)}
          workdays={workdays}
          setWorkdays={setWorkdays}
          selectedDate={selectedDate}
        />
      }

      {isEditPatternOffsetDialogVisible &&
        <EditPatternOffsetDialog
          onClose={() => setIsEditPatternOffsetDialogVisible(false)} 
          patternOffset={patternOffset}
          setPatternOffset={setPatternOffset}
        />
      }
    </div>
  );
}
