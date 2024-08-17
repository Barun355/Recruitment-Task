import WidgetCategory from "./WidgetCategory"

const Widgets = () => {
  return (
    <div className="border flex flex-col gap-2">
      <span>Widgets</span>
      <WidgetCategory />
      <WidgetCategory />
      <WidgetCategory />
      <WidgetCategory />
    </div>
  )
}

export default Widgets
