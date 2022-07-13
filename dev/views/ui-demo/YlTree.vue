<template>
  <div>
    <yl-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}--</span>
        <span>{{ data.id }}</span>
        <span>
          <yl-button type="text" size="mini"> Append </yl-button>
          <yl-button type="text" size="mini"> Delete </yl-button>
        </span>
      </span>
    </yl-tree>

    <hr />

    <div style="height: 300px; overflow: auto">
      <div style="height: 200px"></div>
      <div style="color: #fff">啊啊啊</div>
      <yl-droptree
        show-all-levels
        :tree-data="data"
        v-model="selected"
        placeholder="这个吧还是长一点好，好啊好啊好啊 啊啊啊啊啊啊啊 "
      >
        <!-- <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template> -->
      </yl-droptree>
      <div style="height: 200px"></div>
    </div>
    <hr />
    <div style="height: 200px; overflow: auto">
      <div>label</div>
      <yl-droptree
        dark
        width="280px"
        show-all-levels
        :tree-data="data"
        v-model="selected2"
        :check-strictly="true"
        placeholder="请选择"
      >
        <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template>
      </yl-droptree>
      <div>label</div>
      <yl-droptree
        dark
        width="280px"
        show-all-levels
        :tree-data="data"
        v-model="selected3"
        :check-strictly="true"
        placeholder="请选择"
      >
        <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template>
      </yl-droptree>
      <div>label</div>
      <yl-droptree
        dark
        width="280px"
        show-all-levels
        :tree-data="data"
        v-model="selected4"
        :check-strictly="true"
        placeholder="请选择"
      >
        <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template>
      </yl-droptree>
      <div>label</div>
      <yl-droptree
        dark
        width="280px"
        show-all-levels
        :tree-data="data"
        v-model="selected5"
        :check-strictly="true"
        placeholder="请选择"
      >
        <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template>
      </yl-droptree>
      <div>label</div>
      <yl-droptree
        dark
        width="280px"
        show-all-levels
        :tree-data="data"
        v-model="selected6"
        :check-strictly="true"
        placeholder="请选择"
      >
        <template slot-scope="{ node, data }">
          {{ `${node.label}--id: ${data.id}` }}
        </template>
      </yl-droptree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      selected2: [5],
      selected3: [4],
      selected4: [4],
      selected5: [4],
      selected6: [4],

      data: [
        {
          id: 1,
          label: "一一一",
          children: [
            {
              id: 3,
              label: "二2-1",
              children: [
                {
                  id: 4,
                  label: "三3-1-1",
                },
                {
                  id: 5,
                  label: "三3-1-2112131231312312311232222221312313131ninini",
                },
              ],
            },
            {
              id: 2,
              label: "二2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三3-2-1",
                },
                {
                  id: 7,
                  label: "三3-2-2",
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.selected = [4, 5];
    }, 1000);
  },
};
</script>

<style></style>
