"use client";
import Image from "next/image";
import { addDays, format, isToday } from "date-fns";
import { Button } from "antd";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Calendar from "@/components/Calendar";
import Header from "@/components/Header";
import EditWorkdayDialog from "@/components/EditWorkdayDialog";
import { Workday } from "@/types/Workday";

export default function Home() {
  const [workdays, setWorkdays] = useState<Workday[]>([]);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [viewingMonth, setViewingMonth] = useState(new Date().getMonth());
  const [isEditing, setIsEditing] = useState(false);
  const [isEditWorkdayDialogVisible, setIsEditWorkdayDialogVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [patternOffset, setPatternOffset] = useState<number>(1);

  useEffect(() => {
    const storedPatternOffset = localStorage.getItem("patternOffset");
    if (storedPatternOffset === null) {
      return;
    } 

    setPatternOffset(JSON.parse(storedPatternOffset));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header
        isSideBarVisible={isSideBarVisible}
        setIsSideBarVisible={setIsSideBarVisible}
        viewingMonthIndex={viewingMonth}
        setViewingMonthIndex={setViewingMonth}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        patternOffset={patternOffset}
        setPatternOffset={setPatternOffset}
      />

      <Calendar
        viewingMonth={viewingMonth}
        isEditing={isEditing}
        workdays={workdays}
        setWorkdays={setWorkdays}
        setIsEditWorkdayDialogVisible={setIsEditWorkdayDialogVisible}
        setSelectedDate={setSelectedDate}
        patternOffset={patternOffset}
      />

      {isSideBarVisible &&
        <SideBar onClose={() => setIsSideBarVisible(false)} />
      }

      {isEditWorkdayDialogVisible &&
        <EditWorkdayDialog
          isVisible={isEditWorkdayDialogVisible}
          setIsVisible={setIsEditWorkdayDialogVisible}
          workdays={workdays}
          setWorkdays={setWorkdays}
          selectedDate={selectedDate}
        />
      }
    </div>
  );
}
