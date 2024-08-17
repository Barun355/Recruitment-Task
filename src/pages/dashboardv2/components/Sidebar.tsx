import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { toggleWidgetSidebar } from "../../../app/features/modals";
import Button from "../../../components/Button";
import { updateWidgetIsActive } from "../../../app/features/widgets";

const AddWidgetSidebar: FC = () => {
  const dispatch = useDispatch();

  // Redux Store data
  const widgetSidebar = useSelector(
    (state: RootState) => state.modal.widgetSidebar
  );
  const widgets_data = useSelector((state: RootState) => state.widget_data);

  // Toggle Sidebar
  function handleOpen() {
    dispatch(toggleWidgetSidebar());
  }

  return (
    <div className="drawer z-50">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={widgetSidebar}
        onChange={() => {}}
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={handleOpen}
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-[32rem] p-0 flex flex-col">
          <div className="w-full px-2 py-4 bg-blue-900 flex justify-between">
            <span className="text-white">Add Widget</span>
            <span onClick={handleOpen} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="flex flex-col justify-between h-full w-full">
            <div className="h-[32rem] w-full p-4 flex flex-col gap-4">
              <span>
                Personalise your dashboard by adding the followding widgets
              </span>
              <div role="tablist" className="tabs tabs-bordered">
                {widgets_data &&
                  Object.keys(widgets_data).map((category) => (
                    <div key={category}>
                      <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label={category}
                      />
                      <div role="tabpanel" className="tab-content p-10">
                        {widgets_data[category].widgets.map((widget) => (
                          <div className="form-control" key={widget.label}>
                            <label className="cursor-pointer label">
                              <span className="label-text">{widget.label}</span>
                              <input
                                type="checkbox"
                                checked={widget.isActive}
                                className="h-6 w-6 checkbox rounded-md checkbox-info"
                                onChange={() => dispatch(updateWidgetIsActive({category, label: widget.label, isActive: !widget.isActive}))}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex w-full justify-end gap-2 px-4">
              <Button onClick={handleOpen} className="px-4 py-2">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;
