/*
 * @Author: 赵伦
 * @Date: 2019-11-22 13:41:33
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-29 13:34:52
 * @Description: 发票商品 自定义商品
*/
<template>
  <div>
    <form-card
      :key="i"
      class="mt10 d-relative"
      v-for="(goods,i) of (data.invoiceDetailList || []).filter(item=>item.type==1)"
    >
      <i
        @click="remove(goods)"
        class="remove-icon el-icon-error d-pointer f20 d-text-qgray"
        v-if="!disabled"
      ></i>
      <el-row :gutter="10">
        <el-col
          :key="index"
          :span="item.span || 8"
          v-for="(item,index) of formItems"
        >
          <el-form-item
            :label="item.label"
            :prop="`invoiceDetailList.${(data.invoiceDetailList || []).indexOf(goods)}.${item.prop}`"
            :rules="item.rules"
          >
            <el-input
              :disabled="disabled||item.disabled"
              :placeholder="`请输入${item.label}`"
              v-if="item.type =='input'"
              v-model.trim="goods[item.prop]"
            />
            <el-input
              :disabled="true"
              :placeholder="`请输入${item.label}`"
              :value="item.format(goods)"
              v-else-if="item.type =='show'"
            />
            <el-select
              :disabled="disabled||item.disabled"
              :placeholder="`请输入${item.label}`"
              class="wfull"
              v-else-if="item.type =='select'"
              v-model="goods[item.prop]"
            >
              <el-option
                :key="item.code"
                :label="item.content"
                :value="item.code"
                v-for="item in dictionaryOptions(item.dicName)"
              />
            </el-select>
            <el-date-picker
              :disabled="disabled||item.disabled"
              :placeholder="`请选择${item.label}`"
              class="wfull"
              v-else-if="item.type =='date'"
              v-model="goods[item.prop]"
              value-format="timestamp"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </form-card>
    <div
      @click="add"
      class="add-bar d-text-gray ac f14 d-pointer"
      v-if="!disabled"
    >+ 添加</div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      default: () => {
        return {
          invoiceDetailList: [{ type: 1 }]
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      // prettier-ignore
      items: [
        { label: '货物名称', prop: 'articleName', type: 'input', },
        { label: '规格类型', prop: 'specification', type: 'input', },
        { label: '单位', prop: 'unit', type: 'input', },
        { label: '数量', prop: 'quantity', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'positiveNum' }, { validator: this.checkQuantity }] },
        { label: '单价', prop: 'price', type: 'input', rules: [{ required: true, trigger: 'blur' }, { type: 'price' }] },
        { label: '金额', prop: 'beforeTaxAmount', type: 'show', format: (a) => +Number(+a.price * +a.quantity).toFixed(2) || 0 },
        { label: '税率', prop: 'taxRate', type: 'input', rules: [{ required: true, trigger: 'blur' }, { validator: this.checkTax }] },
        { label: '税额', prop: 'taxAmount', type: 'show', format: (a) => +Number(+a.price * (+a.taxRate / 100) * +a.quantity).toFixed(2) || 0 },
      ]
    };
  },
  computed: {
    formItems() {
      return this.items.filter(item => !this.hide.includes(item.prop));
    },
  },
  methods: {
    checkQuantity(rule, value, cb) {
      if (value > 0) cb();
      else cb(new Error('数量最低为1'));
    },
    checkTax(rule, value, cb) {
      if (value >= 0 && parseFloat(value) == value) {
        cb();
      } else {
        cb(new Error('税率填写有误'));
      }
    },
    remove(row) {
      let i = this.data.invoiceDetailList.indexOf(row);
      if (i >= 0) {
        this.data.invoiceDetailList.splice(i, 1);
      }
    },
    add() {
      if(!this.data.invoiceDetailList) this.$set(this.data,'invoiceDetailList',[])
      this.data.invoiceDetailList.push({
        type: 1,
        isOrder: 0
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.remove-icon {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 10;
}
.add-bar {
  margin-top: 10px;
  padding: 4px;
  border: 1px dashed #ccc;
  border-radius: 2px;
  user-select: none;
}
</style>