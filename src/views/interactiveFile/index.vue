<template>
  <div id="app-main">
    <navbar></navbar>
    <el-row class="change-area">
      <el-col :span="16">
        <el-row>
          <div class="form-area">
            <span>
              <el-select v-model="operation" placeholder="please select">
                <el-option
                  v-for="item in operationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button type="primary" @click="addOperation"
                >confirm</el-button
              >
            </span>
            <span>
              <el-button type="success" @click="toDownload">download</el-button>
            </span>
          </div>
        </el-row>
        <el-row>
          <el-card class="operation-area">
            <el-collapse
              v-for="(operation, index) in operationsStep"
              :key="index"
              v-model="activeName"
              accordion
            >
              <el-collapse-item
                :name="index"
                class="header"
                :class="setAll[index].set == true ? 'set' : 'not-set'"
              >
                <template slot="title">
                  <div class="collapse-header">
                    <div>
                      {{ operation.name }}
                    </div>
                    <div>
                      <el-button
                        @click.stop="removeOperation(index)"
                        icon="el-icon-delete"
                        class="btn-editor btn-delete"
                        round
                      ></el-button>
                    </div>
                  </div>
                </template>
                <el-card
                  v-if="
                    operation.name === 'upper(string)' ||
                    operation.name === 'lower(string)'
                  "
                >
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'replace(string)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="replace" prop="path">
                      <el-input
                        class="replace-input"
                        v-model="operation.oldStr"
                        placeholder="support for regular expression, like /^[0-9]*$/"
                        @blur="checkSet(index)"
                      ></el-input>
                      &nbsp; to &nbsp;
                      <el-input
                        class="replace-input"
                        v-model="operation.newStr"
                        placeholder="please input text"
                        @blur="checkSet(index)"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'delete(string)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="delete" prop="path">
                      <el-input
                        class="replace-input"
                        v-model="operation.str"
                        placeholder="support for regular expression, like /^[0-9]*$/"
                        @blur="checkSet(index)"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'convert(boolean)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'false(boolean)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'true(boolean)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'round(number)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="method" prop="path">
                      <el-select
                        v-model="operation.roundMethod"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in roundMethodValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'add(number)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="add number" prop="addNumber">
                      <el-input-number
                        class="replace-input"
                        v-model="operation.num"
                        :precision="1"
                        :step="0.1"
                        @blur="checkSet(index)"
                      ></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
                <el-card v-else-if="operation.name === 'minus(number)'">
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="field" prop="path">
                      <el-select
                        v-model="operation.path"
                        placeholder="please select"
                      >
                        <el-option
                          v-for="item in keyValue"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="float: left">{{ item.label }}</span>
                          <span
                            style="
                              float: right;
                              color: #8492a6;
                              font-size: 13px;
                            "
                            >{{ item.path }}</span
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <el-form
                    :model="operation"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="minus number" prop="minusNumber">
                      <el-input-number
                        class="replace-input"
                        v-model="operation.num"
                        :precision="1"
                        :step="0.1"
                        @blur="checkSet(index)"
                      ></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-collapse-item>
            </el-collapse>
            <div class="mention">
              <div class="green">
                The green color indicates completed, which changes the JSON on
                the right.
              </div>
              <div class="red">
                The red color indicates unfinished, which does not affect the
                JSON on the right.
              </div>
            </div>
            <div class="change-btn">
              <el-button type="primary" @click="handleOperations"
                >change</el-button
              >
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="show-box">
          <json-viewer
            :value="jsonFormat"
            :expand-depth="4"
            expanded
            copyable
            boxed
          ></json-viewer>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { FilesToJson } from "../../common/util/toJson/FilesToJson";
import { JsonToJson } from "../../common/util/toJson/filesTo/JsonToJson";
import { CsvToJson } from "../../common/util/toJson/filesTo/CsvToJson";
import { XmlToJson } from "../../common/util/toJson/filesTo/XmlToJson";
import { YamlToJson } from "../../common/util/toJson/filesTo/YamlToJson";
import { getUniqKey } from "../../common/util/jsonKey";
import { processOperations } from "../../common/util/operation";
import Navbar from "../../components/navbar.vue";
import JsonViewer from "vue-json-viewer";

export default {
  name: "InteractiveFile",
  data() {
    return {
      activeName: 0,
      changeTool: new FilesToJson(),
      jsonFormat: {},
      originalJson: {}, // set when page init, this value will not be changed after init.
      operation: "upper(string)",
      operationsStep: [],
      operationOptions: [
        {
          value: "upper(string)",
          label: "upper(string)",
        },
        {
          value: "lower(string)",
          label: "lower(string)",
        },
        {
          value: "replace(string)",
          label: "replace(string)",
        },
        {
          value: "delete(string)",
          label: "delete(string)",
        },
        {
          value: "convert(boolean)",
          label: "convert(boolean)",
        },
        {
          value: "false(boolean)",
          label: "false(boolean)",
        },
        {
          value: "true(boolean)",
          label: "true(boolean)",
        },
        {
          value: "round(number)",
          label: "round(number)",
        },
        {
          value: "add(number)",
          label: "add(number)",
        },
        {
          value: "minus(number)",
          label: "minus(number)",
        },
      ],
      keyValue: [
        {
          value: "All",
          label: "All",
          path: "All",
        },
      ],
      roundMethodValue: [
        {
          value: "round",
          label: "round",
        },
        {
          value: "floor",
          label: "floor",
        },
        {
          value: "ceil",
          label: "ceil",
        },
      ],
      setAll: [],
    };
  },
  components: {
    Navbar,
    JsonViewer,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (
        localStorage.getItem("value") != null &&
        localStorage.getItem("type") != null
      ) {
        let type = localStorage.getItem("type");

        // determine the different file types, using different classes
        switch (type) {
          case "json":
            this.changeTool = new JsonToJson(localStorage.getItem("value"));
            break;
          case "csv":
            this.changeTool = new CsvToJson(localStorage.getItem("value"));
            break;
          case "xml":
            this.changeTool = new XmlToJson(localStorage.getItem("value"));
            break;
          case "yaml":
            this.changeTool = new YamlToJson(localStorage.getItem("value"));
            break;
        }
        // use method in the class to change file data to json format
        this.changeTool.changeToJson().then((_) => {
          this.jsonFormat = JSON.parse(
            JSON.stringify(this.changeTool.jsonText)
          );
          this.originalJson = JSON.parse(
            JSON.stringify(this.changeTool.jsonText)
          );
          let array = getUniqKey(this.jsonFormat);
          array.forEach((item) => {
            this.keyValue.push({
              value: item.path,
              label: item.key,
              path: item.path,
            });
          });
        });

        // remove the item in the local storage
        localStorage.removeItem("value");
        localStorage.removeItem("type");
      } else {
        // if has not value in the local storage, redirect to home page.
        this.$router.push("/");
      }
    },
    // jump to the download page
    toDownload() {
      localStorage.setItem("json", JSON.stringify(this.jsonFormat));
      this.$router.push("/download");
    },

    // remove the operation
    removeOperation(index) {
      this.operationsStep.splice(index, 1);
      this.setAll.splice(index, 1);
    },

    // add the operation
    addOperation() {
      switch (this.operation) {
        case "upper(string)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
          });
          break;
        case "lower(string)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
          });
          break;
        case "replace(string)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
            oldStr: "",
            newStr: "",
          });
          break;
        case "delete(string)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
            str: "",
          });
          break;
        case "convert(boolean)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
          });
          break;
        case "false(boolean)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
          });
          break;
        case "true(boolean)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
          });
          break;
          case "round(number)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
            roundMethod: "round"
          });
          break;
          case "add(number)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
            num: 1
          });
          break;
          case "minus(number)":
          this.operationsStep.push({
            name: this.operation,
            path: "All",
            num: 1
          });
          break;
        default:
          this.operationsStep.push({
            name: "not operation",
            space: "",
          });
      }
      this.setAll.push({
        set: false,
      });
      this.checkSet(this.setAll.length - 1);
    },

    // check is completed or not
    checkSet(index) {
      let complete = true;
      for (let item in this.operationsStep[index]) {
        if (
          this.operationsStep[index][item] == "" ||
          this.operationsStep[index][item] == null ||
          this.operationsStep[index][item] == undefined
        ) {
          complete = false;
        }
      }
      if (complete) {
        this.setAll[index].set = true;
      } else {
        this.setAll[index].set = false;
      }
    },

    handleOperations() {
      let operationsStep = [];
      this.operationsStep.forEach((item, index) => {
        if (this.setAll[index].set) {
          operationsStep.push(JSON.parse(JSON.stringify(item)));
        }
      });
      let handleData = processOperations(
        JSON.parse(JSON.stringify(this.originalJson)),
        JSON.parse(JSON.stringify(operationsStep))
      );
      this.jsonFormat = JSON.parse(JSON.stringify(handleData));
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .change-area {
    margin: 5px 20px 0;

    .el-row {
      margin-top: 10px;

      .form-area {
        display: flex;
        justify-content: space-between;
        width: 95%;
      }
    }

    .operation-area {
      width: 95%;
      height: calc(100vh - 148px);
      border: #5e5252 solid 2px;
      position: relative;

      /deep/.el-card__body {
        height: calc(100% - 80px);
        overflow: scroll;

        .set {
          .el-collapse-item__header {
            background-color: rgba(109, 201, 18, 0.5);
          }
        }
        .not-set {
          .el-collapse-item__header {
            background-color: rgba(201, 39, 18, 0.5);
          }
        }

        .collapse-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-right: 10px;

          .btn-delete {
            color: white;
            background-color: #f56c6c;
            border-color: #f56c6c;
          }
        }

        .replace-input {
          width: 320px;
        }
      }

      .mention {
        position: absolute;
        width: 566px;
        bottom: 5px;

        .green {
          background-color: rgba(109, 201, 18, 0.5);
        }
        .red {
          background-color: rgba(201, 39, 18, 0.5);
        }
      }

      .change-btn {
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
    }

    .show-box {
      border: 3px solid #5e5252;
      border-radius: 5px;
      height: calc(100vh - 90px);
      overflow: scroll;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }
}
</style>