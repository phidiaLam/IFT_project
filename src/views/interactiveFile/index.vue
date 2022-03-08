<template>
  <div id="app-main">
    <navbar></navbar>
    <el-row class="change_area">
      <el-col :span="16">
        <el-row>
          <div class="form_area">
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
              <el-button type="primary">confirm</el-button>
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
                :class="setAll[index].set == true ? 'set' : 'not_set'"
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
                <el-card>
                  <el-select
                    v-model="operation.keyValue"
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
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ item.path }}</span
                      >
                    </el-option>
                  </el-select>
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
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="show_box">
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
      operation: "round time",
      operationsStep: [
        {
          name: "round",
          keyValue: "All",
        },
        {
          name: "upper",
          keyValue: "All",
        },
      ],
      operationOptions: [
        {
          value: "0",
          label: "round time",
        },
      ],
      keyValue: [
        {
          value: "All",
          label: "All",
          path: "All"
        },
      ],
      setAll: [
        {
          set: true,
        },
        {
          set: false,
        },
      ],
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
        // localStorage.removeItem("value");
        // localStorage.removeItem("type");
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
      this.imgList.splice(index, 1);
      this.setAll.splice(index, 1);
    },

    addOperation() {
      this.operationsStep.push({
        starTime: "",
        overTime: "",
        imgUrl: "",
        content: "",
        notice: false,
      });
      this.setAll.push({
        set: false,
      });
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .change_area {
    margin: 5px 20px 0;

    .el-row {
      margin-top: 10px;

      .form_area {
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
        .not_set {
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
      }

      .mention {
        position: absolute;
        width: 566px;
        left: 50%;
        bottom: -10px;
        transform: translate(-50%, -50%);

        .green {
          background-color: rgba(109, 201, 18, 0.5);
        }
        .red {
          background-color: rgba(201, 39, 18, 0.5);
        }
      }
    }

    .show_box {
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