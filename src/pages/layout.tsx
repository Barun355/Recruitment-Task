import { FC, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toggleSearchModal } from "../app/features/modals";
import { WidgetState } from "../app/features/widgets";

const MainLayout: FC = () => {
  const dispatch = useDispatch();

  // Redux Store Data
  const widget_data = useSelector((state: RootState) => state.widget_data);
  const searchModal = useSelector(
    (state: RootState) => state.modal.searchModal
  );
  
  // Component states
  const [searchInput, setSearchInput] = useState("");
  const [filterWidget, setFilterWidget] = useState(widget_data);

  // Component Elements Reference
  const searchModalRef = useRef<HTMLDialogElement | null>(null);

  // Toggle Search Modal
  function handleSearchModal() {
    dispatch(toggleSearchModal());
  }

  // Filter Widget Data to Display in the UI on the basic of Search Input
  useEffect(() => {
    const finalWidget: WidgetState = {};

    Object.keys(filterWidget).forEach((category) => {
      const newWidget = widget_data[category].widgets.filter((widget) =>
        widget.label.includes(searchInput)
      );
      finalWidget[category] = {
        label: filterWidget[category].label,
        widgets: newWidget,
      };
      setFilterWidget(finalWidget);
    });
  }, [searchInput]);


  // Toggle Search Modal
  useEffect(() => {
    searchModal
      ? searchModalRef.current?.showModal()
      : searchModalRef.current?.close();
    // setSearchModal(prev => !prev);
  }, [searchModal]);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <dialog id="search_modal" className="modal" ref={searchModalRef}>
        <div className="modal-box">
          <div className="py-4 flex flex-col gap-4 min-h-32 max-h-96 overflow-y-auto">
            <label className="outline-none border-2 border-slate-400 py-2 px-2 rounded-lg flex items-center gap-2">
              <input
                type="text"
                className="grow border-none outline-none bg-transparent"
                placeholder="Search your widget"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <div className="flex flex-col gap-4">
              {Object.keys(filterWidget).map((category, idx) =>
                filterWidget[category].widgets.length > 0 ? (
                  <div className="flex flex-col" key={idx}>
                    <label className="font-bold">
                      {filterWidget[category].label}
                    </label>
                    <div className="flex flex-col">
                      {filterWidget[category].widgets.map((widget) => (
                        <span key={widget.label}>{widget.label}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <header className="h-fit w-full bg-white px-8 py-2 flex justify-between">
        <Breadcrumbs />
        <div
          className="border w-96 flex gap-2 items-center bg-[#f4f4f4] py-2 px-1 rounded-md"
          onClick={() => handleSearchModal()}
        >
          <label htmlFor="main-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="h-[1.2rem] w-[1.2rem] cursor-pointer stroke-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </label>
          {/* <span className="bg-transparent border outline-none h-[100%] w-full px-2 cursor-pointer">Search widget or CTRL + K</span> */}
        </div>
      </header>
      <div className="h-[100%] w-full px-8 py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
