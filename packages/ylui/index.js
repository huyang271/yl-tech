// import YlDropdown from "./dropdown";
// import YlDropdownMenu from "./dropdown-menu";
// import YlDropdownItem from "./dropdown-item";
// import YlDropdownGroup from "./dropdown-group";
// import YlTooltip from "./tooltip";
// import YlPopover from "./popover";
import YlButton from "./components/button";
// import YlCascader from "./cascader";
// import YlCascaderPanel from "./cascader-panel";
// import YlDialog from "./dialog";
// import YlSelect from "./select";
// import YlOption from "./option";
// import YlOptionGroup from "./option-group";
// import YlInput from "./input";
// import YlDatePicker from "./date-picker";
// import YlTimePicker from "./time-picker";
// import YlSwitch from "./switch";
// import YlRadio from "./radio";
// import YlRadioGroup from "./radio-group";
// import YlRadioButton from "./radio-button";
// import YlCheckbox from "./checkbox";
// import YlCheckboxGroup from "./checkbox-group";
// import YlCheckboxButton from "./checkbox-button";
// import YlForm from "./form";
// import YlFormItem from "./form-item";
// import YlTree from "./tree";
// import YlDroptree from "./droptree";

// import Message from "./toast";
// import MessageBox from "./message-box";

const components = [
  // YlDropdown,
  // YlDropdownMenu,
  // YlDropdownItem,
  // YlDropdownGroup,
  // YlTooltip,
  // YlPopover,
  YlButton,
  // YlCascader,
  // YlCascaderPanel,
  // YlDialog,
  // YlSelect,
  // YlOption,
  // YlOptionGroup,
  // YlInput,
  // YlDatePicker,
  // YlTimePicker,
  // YlSwitch,
  // YlRadio,
  // YlRadioGroup,
  // YlRadioButton,
  // YlCheckbox,
  // YlCheckboxGroup,
  // YlCheckboxButton,
  // YlFormItem,
  // YlForm,
  // YlTree,
  // YlDroptree,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // Vue.prototype.$toast = Message;
  // Vue.prototype.$dialog = MessageBox.confirm;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  install,
  // YlDropdown,
  // YlDropdownMenu,
  // YlDropdownItem,
  // YlDropdownGroup,
  // YlTooltip,
  // YlPopover,
  YlButton,
  // YlCascader,
  // YlCascaderPanel,
  // YlDialog,
  // YlSelect,
  // YlOption,
  // YlOptionGroup,
  // YlSwitch,
  // YlInput,
  // YlDatePicker,
  // YlTimePicker,
  // YlRadio,
  // YlRadioGroup,
  // YlRadioButton,
  // YlCheckbox,
  // YlCheckboxGroup,
  // YlCheckboxButton,
  // YlFormItem,
  // YlForm,
  // YlTree,
  // YlDroptree,
  // Message,
  // MessageBox,
};
