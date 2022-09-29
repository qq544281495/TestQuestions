<template>
  <div id="case" v-loading="loading">
    <el-form :inline="true" :model="formLine" class="demo-form-inline">
      <el-form-item label="名称:">
        <el-input style="width: 240px;" v-model="formLine.name" placeholder="请输入名称查询" />
      </el-form-item>
      <el-form-item label="年龄:">
        <el-input style="width: 240px;" v-model="formLine.age" placeholder="请输入年龄查询" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><Search /></el-icon>
          <span style="margin-right: 4px;" @click="searchUser">搜索</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><RefreshRight /></el-icon>
          <span style="margin-right: 4px;" @click="resetUser">重置</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><Filter /></el-icon>
          <span style="margin-right: 4px;">高级查询</span>
          </el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          <span style="margin-right: 4px;" @click="addInfo()">新增</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          <span style="margin-right: 4px;">创建单据</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          <span style="margin-right: 4px;">一对多</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><Download /></el-icon>
          <span style="margin-right: 4px;">下载</span>
          </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <el-icon><FolderChecked /></el-icon>
          <span style="margin-right: 4px;">导出</span>
          </el-button>
      </el-form-item>
    </el-form>
    <div class="info-row">
      <div class="row-left">
        <span>已选择<span style="margin: 4px; color: #1890ff;">{{ selectNumber }}</span>项</span>
        <a style="margin-left: 10px;" href="JavaScript:void(0)" @click="clearSelect()">清空</a>
      </div>
      <div class="row-right">
        <a style="margin-left: 10px;" href="JavaScript:void(0)">
          <el-icon><Refresh /></el-icon>
          刷新
        </a>
        <a style="margin-left: 10px;" href="JavaScript:void(0)">
          <el-icon><Setting /></el-icon>
          自定义列表
        </a>
      </div>
    </div>
    <el-table
      ref="userTableRef"
      :data="user"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      border
      height="calc(100vh - 262px)"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="55"
        :index="indexMethod">
      </el-table-column>
      <el-table-column align="center" property="name" label="姓名" min-width="120" />
      <el-table-column align="center" property="antistop" label="关键字" min-width="120" />
      <el-table-column align="center" property="clock" label="打卡时间" min-width="140" />
      <el-table-column align="center" property="sex" label="性别" min-width="120" />
      <el-table-column align="center" property="age" label="年龄" min-width="120" />
      <el-table-column align="center" property="birthday" label="生日" min-width="140" />
      <el-table-column align="center" property="email" label="邮箱" min-width="160" />
      <el-table-column align="center" property="resume" label="个人简介" min-width="140" />
      <el-table-column align="center" label="操作" min-width="140">
        <template #default="scope">
          <a href="JavaScript:void(0)" style="margin-right: 20px;" @click="editInfo(scope.row)">编辑</a>
          <el-dropdown>
            <span class="el-dropdown-link" style="color: #1890ff; font-size: 14px; line-height: 22px;">
              更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">测试</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px;"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="->,total,  prev, pager, next, sizes, jumper"
      :total="user.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog v-model="dialogTableVisible" :title="dialogTitle" width="600px" style="padding-right: 30px;" :before-close="handleClose">
      <el-form hide-required-asterisk="false" ref="ruleFormRef" :rules="rules" :model="userInfo" label-width="100px" style="margin-top: -20px; margin-bottom: -20px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="userInfo.name" placeholder="请输入姓名" :disabled="judg" />
        </el-form-item>
        <el-form-item label="关键字：" prop="antistop">
          <el-input v-model="userInfo.antistop" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="打卡时间：" prop="clock">
          <el-date-picker
            v-model="userInfo.clock"
            type="datetime"
            placeholder="请选择打卡时间"
            value-format="YYYY-MM-DD hh:mm:ss"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="userInfo.sex" placeholder="请选择性别">
            <el-option key="男" value="男" label="男"></el-option>
            <el-option key="女" value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model="userInfo.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="生日：" prop="birthday">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            placeholder="请选择生日"
            value-format="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="个人简介：" prop="resume">
          <el-input v-model="userInfo.resume" placeholder="请输入个人简介" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose()">关闭</el-button>
          <el-button @click="confirm()" type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ref,reactive,onBeforeMount,toRefs} from 'vue';
export default {
  name:"Case-Demo",
  setup(){
    let loading = ref(false);
    let judg = ref(false);
    let dialogTitle = ref("新增");
    let dialogTableVisible = ref(false);
    let currentPage = ref(1);
    let pageSize = ref(10);
    let info = ref("试题Demo");
    let formLine = reactive({
      name: "",
      age: "",
    });
    let selectUser = reactive([]);
    let selectNumber = ref(0);
    let userTableRef = ref(null);
    let ruleFormRef = ref(null);
    let state = reactive({
      realUser: [
        {name:"迣岳",antistop:"Web开发",clock:"2022-09-28 21:00:00",sex:"男",age:24,birthday:"1998-12-12",email:"544281495@qq.com",resume:"个人账户"},
        {name:"悠悠然",antistop:"Web开发",clock:"2022-09-28 21:00:00",sex:"女",age:24,birthday:"1998-12-12",email:"544281495@qq.com",resume:"个人账户"},
        {name:"晴川",antistop:"Web开发",clock:"2022-09-28 21:00:00",sex:"女",age:24,birthday:"1998-12-12",email:"544281495@qq.com",resume:"个人账户"},
        {name:"九黎",antistop:"Web开发",clock:"2022-09-28 21:00:00",sex:"女",age:24,birthday:"1998-12-12",email:"544281495@qq.com",resume:"个人账户"}
      ],
      user: []
    });
    const rules = reactive({
      name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
      antistop:[{ required: true, message: '请输入关键词', trigger: 'blur' }],
      clock:[{ required: true, message: '请选择打卡时间', trigger: 'blur' }],
      sex:[{ required: true, message: '请选择性别', trigger: 'blur' }],
      age:[{ required: true, message: '请输入年龄', trigger: 'blur' }],
      birthday:[{ required: true, message: '请选择生日', trigger: 'blur' }],
      email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      resume:[{ required: true, message: '请输入个人简介', trigger: 'blur' }],
    });
    let userInfo = reactive({
      name:'',
      antistop:'',
      clock:'',
      sex:'',
      age:'',
      birthday:'',
      email:'',
      resume:''
    });
    const resetUser = ()=>{
      formLine.name = "";
      formLine.age = "";
      searchUser();
    }
    const searchUser = ()=>{
      console.log(formLine.age);
      if(formLine.name == "" && formLine.age == ""){
        state.user = [...state.realUser];
      }else if(formLine.name == ""){
        let params = state.user.filter(item=>{
          return item.age == formLine.age;
        })
        state.user = [...params];
      }else if(formLine.age == ""){
        let params = state.user.filter(item=>{
          return item.name == formLine.name;
        })
        state.user = [...params];
      }else{
        let params = state.user.filter(item=>{
          return (item.age == formLine.age) && (item.name == formLine.name);
        })
        state.user = [...params];
      }
    }
    const handleClose = ()=>{
      dialogTableVisible.value = false;
      judg.value = false;
      ruleFormRef.value.resetFields()
    }
    const confirm = ()=>{
      ruleFormRef.value.validate((valid)=>{
        if(valid){
          loading.value = true;
          if(dialogTitle.value == "新增"){
            state.user.push(userInfo);
            loading.value = false;
          }else if(dialogTitle.value == "编辑"){
            for(let index in state.user){
              if(state.user[index].name == userInfo.name){
                state.user[index] = userInfo
              }
            }
            loading.value = false;
          }
          dialogTableVisible.value = false;
        }else{
          return false;
        }
      })
    }
    const addInfo = ()=>{
      dialogTableVisible.value = true;
      dialogTitle.value = "新增";
      judg.value = false;
      userInfo.name = "";
      userInfo.antistop = ""
      userInfo.clock = ""
      userInfo.sex = ""
      userInfo.age = ""
      userInfo.birthday = ""
      userInfo.email = ""
      userInfo.resume = ""
    }
    const handleSelectionChange = (value)=>{
      selectUser = value;
      selectNumber.value = selectUser.length;
    }
    const clearSelect = ()=>{
      userTableRef.value.clearSelection()
    }
    const handleSizeChange = (value)=>{
      console.log("每页显示数据："+value);
    }
    const handleCurrentChange = (value)=>{
      console.log("当前页码："+value);
    }
    const editInfo = (value)=>{
      console.log(value);
      dialogTableVisible.value = true;
      dialogTitle.value = "编辑";
      judg.value = true;
      userInfo.name = value.name;
      userInfo.antistop = value.antistop
      userInfo.clock = value.clock
      userInfo.sex = value.sex
      userInfo.age = value.age
      userInfo.birthday = value.birthday
      userInfo.email = value.email
      userInfo.resume = value.resume
    }
    onBeforeMount(()=>{
     for(let item of state.realUser){
      state.user.push(item);
     }
    })
    return {
      loading,
      info,
      formLine,
      // user,
      selectNumber,
      selectUser,
      userTableRef,
      handleSelectionChange,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      clearSelect,
      userInfo,
      dialogTableVisible,
      editInfo,
      dialogTitle,
      addInfo,
      handleClose,
      confirm,
      // realUser,
      rules,
      ruleFormRef,
      judg,
      searchUser,
      resetUser,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="sass" scoped>
  a
    color: #1890ff
  #case
    background-color: #fff
    padding: 20px
    .info-row
      display: flex
      justify-content: space-between
      padding: 10px 20px
      background-color: #e6f7ff
      border: 1px solid #91d5ff
      border-radius: 2px
      margin-bottom: 10px
</style>