<template>
  <transition name="msgbox-fade">
    <div
      class="el-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
    >
      <div
        class="el-message-box"
        :class="[customClass, center && 'el-message-box--center']"
      >
        <div class="el-message-box__header" v-if="title">
          <div class="el-message-box__title">
            <!-- <div :class="['el-message-box__status', icon]"></div> -->
            <img
              v-if="type"
              class="yl-message-box__headerIcon"
              :src="iconUrl"
              alt=""
            />
            <span
              :class="[
                'el-message-box__title--text yl-message-box__title--text',
                type ? 'el-message-box__title--withIcon' : '',
              ]"
              >{{ title }}</span
            >
          </div>
          <button
            type="button"
            class="el-message-box__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
            @keydown.enter="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
          >
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__container">
            <!-- <div
              :class="['el-message-box__status', icon]"
              v-if="icon && !center && message !== ''"
            ></div> -->
            <div class="el-message-box__message" v-if="message !== ''">
              <div
                v-if="!title"
                :class="[
                  'el-message-box__status',
                  icon,
                  title ? '' : 'yl-message-box__icon',
                ]"
              ></div>
              <div
                :class="[
                  'yl-message-box__content',
                  title
                    ? 'yl-message-box__content--withtitle'
                    : 'yl-message-box__content--notitle',
                  type ? '' : 'yl-message-box__content--noType',
                ]"
              >
                <slot>
                  <p v-if="!dangerouslyUseHTMLString">
                    {{ message }}
                  </p>
                  <p v-else v-html="message"></p>
                </slot>
              </div>
            </div>
          </div>
          <div class="el-message-box__input" v-show="showInput">
            <el-input
              v-model="inputValue"
              :type="inputType"
              @keydown.enter.native="handleInputEnter"
              :placeholder="inputPlaceholder"
              ref="input"
            ></el-input>
            <div
              class="el-message-box__errormsg"
              :style="{
                visibility: !!editorErrorMessage ? 'visible' : 'hidden',
              }"
            >
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="el-message-box__btns" ref="btns">
          <el-button
            :loading="cancelButtonLoading"
            :class="[cancelButtonClasses]"
            v-if="showCancelButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t("el.messagebox.cancel") }}
          </el-button>
          <el-button
            :loading="otherButtonLoading"
            :class="[otherButtonClasses]"
            v-if="showOtherButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('other')"
            @keydown.enter="handleAction('other')"
          >
            {{ otherButtonText || t("el.messagebox.other") }}
          </el-button>
          <el-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[confirmButtonClasses]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            :type="confirmBtnType"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t("el.messagebox.confirm") }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from "element-ui/src/utils/popup";
import Locale from "element-ui/src/mixins/locale";
import ElInput from "element-ui/packages/input";
import ElButton from "element-ui/packages/button";
import { addClass, removeClass } from "element-ui/src/utils/dom";
import { t } from "element-ui/src/locale";
import Dialog from "element-ui/src/utils/aria-dialog";

let messageBox;
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "warning",
};
// 新的icon
let iconMap = {
  success: "success",
  info: "info",
  warning: "error",
  error: "error",
};
let btnTypeMap = {
  success: "primary",
  info: "primary",
  warning: "danger",
  error: "danger",
};

export default {
  name: "MessageBox",
  mixins: [Popup, Locale],

  props: {
    modal: {
      default: true,
    },
    lockScroll: {
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      default: true,
    },
    closeOnPressEscape: {
      default: true,
    },
    closeOnHashChange: {
      default: true,
    },
    center: {
      default: false,
      type: Boolean,
    },
    roundButton: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    ElInput,
    ElButton,
  },

  computed: {
    icon() {
      const { type, iconClass } = this;
      return (
        iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : "")
      );
    },
    iconUrl() {
      return require(`../../../static/icons/${iconMap[this.type]}-icon.png`);
    },

    confirmButtonClasses() {
      return `el-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    },
    otherButtonClasses() {
      return `${this.otherButtonClass}`;
    },
    confirmBtnType() {
      return btnTypeMap[this.type];
    },
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();
      messageBox.closeDialog(); // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? "close" : "cancel");
      }
    },

    handleInputEnter() {
      if (this.inputType !== "textarea") {
        return this.handleAction("confirm");
      }
    },

    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm" && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === "function") {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === "prompt") {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || "")) {
          this.editorErrorMessage =
            this.inputErrorMessage || t("el.messagebox.error");
          addClass(this.getInputElement(), "invalid");
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || t("el.messagebox.error");
            addClass(this.getInputElement(), "invalid");
            return false;
          }
          if (typeof validateResult === "string") {
            this.editorErrorMessage = validateResult;
            addClass(this.getInputElement(), "invalid");
            return false;
          }
        }
      }
      this.editorErrorMessage = "";
      removeClass(this.getInputElement(), "invalid");
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector(".el-message-box__btns .el-button");
      const title = this.$el.querySelector(
        ".el-message-box__btns .el-message-box__title"
      );
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction("close");
    },
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (this.$type === "prompt" && val !== null) {
            this.validate();
          }
        });
      },
    },

    visible(val) {
      if (val) {
        this.uid++;
        if (this.$type === "alert" || this.$type === "confirm") {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus();
          });
        }
        this.focusAfterClosed = document.activeElement;
        messageBox = new Dialog(
          this.$el,
          this.focusAfterClosed,
          this.getFirstFocus()
        );
      }

      // prompt
      if (this.$type !== "prompt") return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputElement().focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = "";
        removeClass(this.getInputElement(), "invalid");
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener("hashchange", this.close);
      }
    });
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener("hashchange", this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  },

  data() {
    return {
      uid: 1,
      title: undefined,
      message: "",
      type: "",
      iconClass: "",
      customClass: "",
      showInput: false,
      inputValue: null,
      inputPlaceholder: "",
      inputType: "text",
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: "",
      showConfirmButton: true,
      showCancelButton: false,
      showOtherButton: false,
      action: "",
      confirmButtonText: "",
      cancelButtonText: "",
      otherButtonText: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      otherButtonLoading: false,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      otherButtonClass: "",
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../base/style/index.scss";
.el-message-box {
  position: relative;
  border-radius: 8px;
  &__headerbtn {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 32px;
    height: 32px;
    &:hover {
      background-color: #f5f5f7;
      border-radius: 4px;
      .el-message-box__close {
        color: #5c5e66;
      }
    }
    .el-message-box__close {
      color: #8d9099;
      font-size: 18px;
      font-weight: bold;
    }
  }
  &__status {
    position: absolute;
    top: 57%;
    transform: translateY(-50%);
    font-size: 19px !important;
  }
  &__title {
    display: flex;
    align-items: center;
    height: 24px;
    &--text {
      font-size: 16px;
    }
    &--withIcon {
      margin-left: 8px;
      padding-top: 2px;
    }
  }
  &__btns {
    .el-button--danger:focus {
      background: #f13e49;
      border-color: #f13e49;
      color: #ffffff;
    }
  }
}
.el-message-box__status.el-icon-info {
  color: $--color-primary;
}
.el-message-box__status.el-icon-warning {
  color: $--color-danger;
}
.yl-message-box__headerIcon {
  width: 22px;
}
.yl-message-box__content {
  p {
    padding-top: 4px;
  }
  &--notitle {
    margin-left: 28px;
    margin-bottom: 30px;
    font-size: 18px;
    color: #20222b;
  }
  &--withtitle {
    margin-bottom: 16px;
    margin-left: 30px;
  }
  &--noType {
    margin-left: 0;
  }
}
.yl-message-box__icon {
  top: 16px !important;
  font-size: 22px !important;
}
.yl-message-box__title--text {
  color: #242529;
  font-size: 16px;
  font-weight: bold;
}
</style>
