<template>
  <el-container class="login-container">
    <div style="margin-top: 2.5rem">
      <img src="@/assets/logo.svg" alt="D3"/>
    </div>
    <el-card class="login-form-container">
      <el-form @keyup.enter.native="onSubmit" class="login-form" ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item label="Private key:" prop="privateKey">
          <el-row type="flex" justify="space-between">
            <el-col :span="20">
              <el-input
                name="privateKey"
                v-model="form.privateKey"
                :disabled="isLoading"
              />
            </el-col>

            <el-upload
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onFileChosen"
              :disabled="isLoading"
            >
              <el-button>
                <fa-icon icon="upload" />
              </el-button>
            </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item label="Username:" prop="username">
          <el-input
            name="username"
            v-model="form.username"
            :disabled="isLoading"
          />
        </el-form-item>
        <el-form-item label="Node ip:" prop="nodeIp">
          <el-select
            v-model="form.nodeIp"
            :disabled="isLoading"
            style="width: 100%;"
            filterable
            allow-create
          >
            <el-option
              v-for="node in listOfNodes"
              :key="node.value"
              :label="node.label"
              :value="node.value">
              <span class="option left">{{ node.label }}</span>
              <span class="option right">{{ node.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="login-button-container">
          <el-button
            class="fullwidth black"
            type="primary"
            @click="onSubmit"
            :loading="isLoading"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import inputValidation from '@/components/mixins/inputValidation'
import listOfNodes from '@/data/nodes.json'

export default {
  name: 'login',
  mixins: [
    inputValidation({
      username: 'nameDomain',
      privateKey: 'privateKeyRequired',
      nodeIp: 'nodeIp'
    })
  ],
  data () {
    return {
      isLoading: false,
      form: {
        username: '',
        privateKey: '',
        nodeIp: this.$store.state.Account.nodeIp
      },
      listOfNodes
    }
  },
  computed: {
    ...mapGetters([
      'nodeIp'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onFileChosen (file, fileList) {
      const reader = new FileReader()

      reader.onload = (ev) => {
        this.form.privateKey = (ev.target.result || '').trim()
        this.form.username = fileList[fileList.length - 1].name.replace('.priv', '')
        this.$refs['form'].validate()
      }

      reader.readAsText(file.raw)
    },

    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false

        this.isLoading = true

        this.login({
          username: this.form.username,
          privateKey: this.form.privateKey,
          nodeIp: (this.form.nodeIp.indexOf('://') === -1) ? 'http://' + this.form.nodeIp : this.form.nodeIp
        })
          .then(account => {
            this.$router.push('/')
          })
          .catch(err => {
            console.error(err)
            this.$alert(err.message, 'Login error', {
              type: 'error'
            })
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-form-container {
    position: relative;
    width: 30rem;
    overflow: visible;
    margin-top: 3rem;
  }

  /*
    ElementUI renders .el-form-item__label without a data attribute,
    so scoped styles doesn't work for it. The `>>>` combinator solves this problem.
    https://vue-loader.vuejs.org/en/features/scoped-css.html
  */
  .login-form >>> .el-form-item__label {
    line-height: 1;
  }

  .login-form >>> .el-form-item__label::before {
    content: '';
  }

  .option.left {
    float: left;
  }

  .option.right {
    float: right;
    font-size: 0.8rem;
    color: #8492a6;
  }
</style>
