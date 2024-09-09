import WidgetCategory from "./WidgetCategory"

const Widgets = () => {
  return (
    <div className="border flex flex-col gap-2">
      <span>Widgets</span>
      <WidgetCategory label={""} category={""} addWidgetToggle={undefined} widgets={[]} />
      <WidgetCategory label={""} category={""} addWidgetToggle={undefined} widgets={[]} />
      <WidgetCategory label={""} category={""} addWidgetToggle={undefined} widgets={[]} />
      <WidgetCategory label={""} category={""} addWidgetToggle={undefined} widgets={[]} />
    </div>
  )
}

export default Widgets
