import { Widgets } from "../../../app/features/widgets";
import Button from "../../../components/Button";
import WidgetCard from "./WidgetCard";
import type { AddWidgetModalStateType } from "../index.tsx";
import { FC } from "react";

interface WidgetCategoryStateType {
  label: string;
  category: string;
  addWidgetToggle: any;
  widgets: Widgets[];
}

const WidgetCategory: FC<WidgetCategoryStateType> = ({
  label,
  category,
  addWidgetToggle,
  widgets,
}) => {
  function handleButton() {
    addWidgetToggle((prev: AddWidgetModalStateType) => {
      return { ...prev, active: true, category };
    });
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <span className="font-bold">{label}</span>
      <div className="flex flex-col flex-wrap gap-4 overflow-x-auto h-64">
        {widgets.map((widget) =>
          widget.isActive ? (
            <WidgetCard
              widget={widget}
              category={category}
              key={widget.label}
            />
          ) : (
            <></>
          )
        )}
        <Button
          onClick={handleButton}
          className="h-56 w-96 flex justify-center items-center gap-4 border-2 bg-slate-100"
        >
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add Widget</span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default WidgetCategory;
