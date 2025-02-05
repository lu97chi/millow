"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({ date, onSelect, placeholder = "Selecciona una fecha" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground hover:bg-accent/50",
            "transition-colors"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={(currentDate: Date) => currentDate < new Date()}
          initialFocus
          locale={es}
          className={cn(
            "p-3 bg-white rounded-lg border shadow-sm",
          )}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center h-10",
            caption_label: "text-base font-medium",
            nav: "flex items-center gap-1",
            nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-70 text-muted-foreground",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "w-9 font-normal text-[0.8rem] text-muted-foreground",
            row: "flex w-full mt-1",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal text-center hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-full transition-colors",
            day_selected: "bg-black text-white hover:bg-black/90 hover:text-white focus:bg-black focus:text-white rounded-full font-medium",
            day_today: "bg-accent/50 text-accent-foreground rounded-full font-medium",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  )
} 