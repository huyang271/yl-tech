<template>
  <yl-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    class="yl-form-demo"
  >
    <yl-form-item prop="name" label="输入框">
      <yl-input v-model="form.name" suffix-icon="el-icon-date"></yl-input>
    </yl-form-item>
    <yl-form-item prop="region" label="选择框">
      <yl-select v-model="form.region" multiple placeholder="普通/多选/分组">
        <yl-option-group
          v-for="group in options1"
          :key="group.label"
          :label="group.label"
        >
          <yl-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </yl-option>
        </yl-option-group>
      </yl-select>
    </yl-form-item>
    <yl-form-item required label="日期选择">
      <el-col :span="11">
        <yl-form-item prop="date1">
          <yl-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
          ></yl-date-picker>
        </yl-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <yl-form-item prop="date2">
          <yl-time-picker
            placeholder="选择时间"
            v-model="form.date2"
          ></yl-time-picker>
        </yl-form-item>
      </el-col>
    </yl-form-item>
    <yl-form-item prop="delivery" label="开关">
      <yl-switch v-model="form.delivery"></yl-switch>
    </yl-form-item>
    <yl-form-item prop="type" label="复选框">
      <!-- <yl-checkbox-group v-model="form.type" size="small">
        <yl-checkbox-button
          label="美食/餐厅线上活动"
          name="type"
        ></yl-checkbox-button>
        <yl-checkbox-button label="地推活动" name="type"></yl-checkbox-button>
        <yl-checkbox-button
          label="线下主题活动"
          name="type"
        ></yl-checkbox-button>
        <yl-checkbox-button
          label="单纯品牌曝光"
          name="type"
        ></yl-checkbox-button>
      </yl-checkbox-group> -->
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
    </yl-form-item>
    <yl-form-item prop="type" label="复选框">
      <yl-checkbox-group v-model="form.type" size="small">
        <yl-checkbox label="美食/餐厅线上活动" name="type"></yl-checkbox>
        <yl-checkbox label="地推活动" name="type"></yl-checkbox>
        <yl-checkbox label="线下主题活动" name="type"></yl-checkbox>
        <yl-checkbox label="单纯品牌曝光" name="type"></yl-checkbox>
      </yl-checkbox-group>
    </yl-form-item>
    <yl-form-item prop="resource" label="单选框">
      <yl-radio-group v-model="form.resource">
        <yl-radio label="线上品牌商赞助"></yl-radio>
        <yl-radio label="线下场地免费"></yl-radio>
        <yl-radio label="虚位以待" disabled></yl-radio>
      </yl-radio-group>
    </yl-form-item>
    <yl-form-item prop="desc" label="文本域">
      <yl-input ref="textarea" type="textarea" v-model="form.desc"></yl-input>
    </yl-form-item>
    <yl-form-item>
      <yl-button type="primary" @click="focus">方法调用</yl-button>
      <yl-button @click="reset">重置表单</yl-button>
    </yl-form-item>
  </yl-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: [],
        region2: [],
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      selected2: [4],

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
      options: [
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Beijing",
          label: "北京",
        },
      ],
      options1: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    focus() {
      this.$refs.textarea.$refs.elInstance.focus();
    },
    reset() {
      this.$refs.form.$refs.elInstance.resetFields();

      // this.$refs.input.focus()
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-form-demo {
  width: 700px;
  height: 300px;
  overflow: auto;
  margin-top: 100px;
}
</style>
