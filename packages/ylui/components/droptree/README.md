## droptree 组件

demo示例：
```
<yl-droptree dark :tree-data="data" v-model="selected" placeholder="请选择" :props="props" nodeKey="name">
  <template slot-scope="{ node, data }">
    {{ `${node.label}--id: ${data.id}` }}
  </template>
</yl-droptree>

// v-model 选中节点keys,array类型
// treeData 树节点数据 
// props 同el-tree props，默认值{ label: "label", children: "children", }
// nodeKey 同el-tree nodeKey,树节点用作key的字段名,默认值id
// checkStrictly 同el-tree checkStrictly,控制父子节点是否严格关联,默认值false
// showAllLevels 控制显示已选节点的所有层级，默认值false
// dark 深色模式
// placeholder 提示文字
// width 宽度，默认值260px，string类型
// scoped slot 用于自定义树节点
```