
## 1.安装方式
通过 git submodules :
```
// 在指定的submodules文件夹下：
git submodule add https://e.coding.net/cnhiz/xinyue2.4/yl-ui.git

// 安装依赖
cd yl-ui
npm i
```

## 2.引入
主项目 main.js
```
// 需要安装element-ui并引入
import ElementUI from 'element-ui';
import '@/yl-modules/yl-ui/src/components/yl-ui/base/style/index.scss';

import * as YlUI from "@/yl-modules/yl-ui/src/components/yl-ui"

Vue.use(ElementUI);
Vue.use(YlUI)
```

## 3.使用组件

in xxx.vue
```
<yl-dropdown trigger="click">
  <yl-dropdown-menu slot="dropdown">
    <yl-dropdown-item command="1">
      <i class="icon iconfont iconjianjie"></i>
      上传文件
    </yl-dropdown-item>
    <yl-dropdown-item command="2">
      <i class="icon iconfont iconic_grey_folder"></i>
      上传文件夹
    </yl-dropdown-item>
  </yl-dropdown-menu>
  <el-button class="btn-small btn--blue btn-40">
    上传 <i class="iconfont iconfanhui_fanhui icon-size"></i>
  </el-button>
</yl-dropdown>
```

## 4.关于yl-ui
> yl-ui开发的初衷是为了保障页面交互的一致性，同时提高我们的开发效率和产品代码的可迭代性。它的底层依赖于element-ui，并且保持了和element-ui一样的api，所以文档可以直接参考 [elemnt-ui文档](https://element.eleme.cn/#/zh-CN/component/button) ，尽管如此，但我们不建议直接在实际开发中使用element-ui。

```
// 已经维护的组件
const components = [
  YlDropdown,
  YlDropdownMenu,
  YlDropdownItem,
  YlDropdownGroup,
  YlTooltip,
  YlPopover,
  YlButton,
  YlCascader,
  YlCascaderPanel,
  YlDialog,
  YlSelect,
  YlOption,
  YlOptionGroup,
  YlSwitch,
  YlInput,
  YlDatePicker,
  YlTimePicker,
  YlRadio,
  YlRadioGroup,
  YlRadioButton,
  YlCheckbox,
  YlCheckboxGroup,
  YlCheckboxButton,
  YlFormItem,
  YlForm,
  Message,
  MessageBox,
];
```