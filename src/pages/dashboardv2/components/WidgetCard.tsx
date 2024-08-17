import { useDispatch } from "react-redux";
import { updateWidgetIsActive, Widgets } from "../../../app/features/widgets";
import Button from "../../../components/Button";

interface WidgetPropType {
  widget: Widgets;
  category: string;
}

const WidgetCard = ({ widget, category }: WidgetPropType) => {

  const dispatch = useDispatch()

  return (
    <div className="border-2 h-56 w-96 rounded-lg py-4 pl-6 pr-6 bg-slate-50 relative flex flex-col">
      <Button 
        onClick={() => dispatch(updateWidgetIsActive({ category, label: widget.label, isActive: !widget.isActive}))}
        className="absolute top-0 right-0 mr-2 mt-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Button>
      <span className="font-bold">{widget.label}</span>
      <div className="data w-full h-[100%] flex justify-center items-center">
        {widget.data}
      </div>
    </div>
  );
};

export default WidgetCard;
