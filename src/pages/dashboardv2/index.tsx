import { FC, useEffect, useRef, useState } from "react";
import DashboardHeader from "./components/Header";
import WidgetCategory from "./components/WidgetCategory";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addWidget } from "../../app/features/widgets";
import AddWidgetSidebar from "./components/Sidebar";
import { toggleWidgetSidebar } from "../../app/features/modals";

export interface AddWidgetModalStateType {
  active: boolean;
  category: string;
}

const DashboardV2: FC = () => {
  const dispatch = useDispatch();

  // HTML Dialog Reference - Add Widget
  const widgetModalRef = useRef<HTMLDialogElement | null>(null);

  // Widgets State from Redux Store
  const widgets_data = useSelector((state: RootState) => state.widget_data);

  // HTML Dialog Active State
  const [addWidgetModal, setAddWidgetModal] = useState<AddWidgetModalStateType>(
    { active: false, category: "" }
  );

  // HTML Dialog - Add Widget State
  const [widgetLabel, setWidgetLabel] = useState("");
  const [widgetData, setWidgetData] = useState("");
  const [widgetCategory, setWidgetCategory] = useState(addWidgetModal.category);


  // Dispatching Action for Adding widget to store and closing addWidgetModal
  function handleAddWidget() {
    dispatch(
      addWidget({
        label: widgetLabel,
        category: widgetCategory,
        data: widgetData,
        isActive: false,
      })
    );
    setAddWidgetModal((prev) => {
      return { ...prev, active: false, category: "" };
    });
    dispatch(toggleWidgetSidebar())
  }

  // Opening & Closing of HTML Dialog - Add Widget
  useEffect(() => {
    addWidgetModal.active
      ? widgetModalRef.current?.showModal()
      : widgetModalRef.current?.close();
    setWidgetCategory(addWidgetModal.category);
  }, [addWidgetModal]);

  return (
    <div className="h-full w-full flex flex-col gap-6">
      <AddWidgetSidebar />
      <dialog
        id="add-widget-modal"
        ref={widgetModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Widget</h3>
          <div className="py-4 flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="widget-label">Label</label>
              <input
                type="text"
                name="lable"
                id="label"
                className="border-2 py-2 px-4 rounded-md outline-blue-300"
                placeholder="Widget Label"
                value={widgetLabel}
                onChange={(e) => setWidgetLabel(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="widget-label">Data</label>
              <input
                type="text"
                name="data"
                id="data"
                className="border-2 py-2 px-4 rounded-md outline-blue-300"
                placeholder="Enter your data"
                value={widgetData}
                onChange={(e) => setWidgetData(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="widget-label">Category</label>
              <select
                name="widget-category"
                id="widget-category"
                className="border-2 py-2 px-4 rounded-md outline-blue-300"
                value={widgetCategory}
                disabled
                onChange={(e) => setWidgetCategory((_) => e.target.value)}
              >
                {Object.keys(widgets_data).map((category) => (
                  <option key={category.toLowerCase().trim()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="border-2 py-1 px-3 rounded-lg bg-slate-100">
                Close
              </button>
            </form>
            <button
              onClick={handleAddWidget}
              className="border-2 py-1 px-3 rounded-lg bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        </div>
      </dialog>
      <DashboardHeader />
      <div className="flex flex-col gap-8 pb-10 w-full">
        {widgets_data &&
          Object.keys(widgets_data).map((category) => (
            <WidgetCategory
              label={widgets_data[category].label}
              widgets={widgets_data[category].widgets}
              category={category}
              addWidgetToggle={setAddWidgetModal}
              key={widgets_data[category].label}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardV2;
