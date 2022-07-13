import YlDropdown from "./components/dropdown";
import YlDropdownMenu from "./components/dropdown-menu";
import YlDropdownItem from "./components/dropdown-item";
import YlDropdownGroup from "./components/dropdown-group";
import YlTooltip from "./components/tooltip";
import YlPopover from "./components/popover";
import YlButton from "./components/button";
// import YlCascader from "./components/cascader";
// import YlCascaderPanel from "./components/cascader-panel";
import YlDialog from "./components/dialog";
import YlSelect from "./components/select";
import YlOption from "./components/option";
import YlOptionGroup from "./components/option-group";
import YlInput from "./components/input";
// import YlDatePicker from "./components/date-picker";
// import YlTimePicker from "./components/time-picker";
import YlSwitch from "./components/switch";
// import YlRadio from "./components/radio";
// import YlRadioGroup from "./components/radio-group";
// import YlRadioButton from "./components/radio-button";
// import YlCheckbox from "./components/checkbox";
// import YlCheckboxGroup from "./components/checkbox-group";
// import YlCheckboxButton from "./components/checkbox-button";
// import YlForm from "./components/form";
// import YlFormItem from "./components/form-item";
import YlTree from "./components/tree";

// import Message from "./components/toast";
import MessageBox from "./components/message-box";

const components = [
  YlDropdown,
  YlDropdownMenu,
  YlDropdownItem,
  YlDropdownGroup,
  YlTooltip,
  YlPopover,
  YlButton,
  // YlCascader,
  // YlCascaderPanel,
  YlDialog,
  YlSelect,
  YlOption,
  YlOptionGroup,
  YlInput,
  // YlDatePicker,
  // YlTimePicker,
  YlSwitch,
  // YlRadio,
  // YlRadioGroup,
  // YlRadioButton,
  // YlCheckbox,
  // YlCheckboxGroup,
  // YlCheckboxButton,
  // YlFormItem,
  // YlForm,
  YlTree,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // Vue.prototype.$toast = Message;
  Vue.prototype.$dialog = MessageBox.confirm;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  install,
  YlDropdown,
  YlDropdownMenu,
  YlDropdownItem,
  YlDropdownGroup,
  YlTooltip,
  YlPopover,
  YlButton,
  // YlCascader,
  // YlCascaderPanel,
  YlDialog,
  YlSelect,
  YlOption,
  YlOptionGroup,
  YlSwitch,
  YlInput,
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
  YlTree,
  // Message,
  MessageBox,
};
