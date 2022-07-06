<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { formSchema, basicformSchema } from './dept.data'
import { useMessage } from '@/hooks/web/useMessage'
import {
  addUserInfo,
  deleteUserInfo,
  editUserInfo,
  getUserInfo,
} from '@service/test/test'
import {
  getDeptApi,
  addDeptApi,
  editDeptApi,
  listDeptExNodesApi,
} from '@service/system/organize/dept'
import { BasicModal, useModalInner } from '@/components/Modal'
import { BasicForm, useForm } from '@/components/Form'
import { useDeptStore } from '@/store/dept.data'
export default defineComponent({
  name: 'DeptModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { createMessage } = useMessage()
    const isUpdate = ref(true)
    const shc = ref(formSchema)
    const store = useDeptStore()

    const [
      registerForm,
      { resetFields, setFieldsValue, updateSchema, validate },
    ] = useForm({
      labelWidth: 100,
      schemas: shc,
      showActionButtonGroup: false,
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(
      async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate

        if (unref(isUpdate)) {
          shc.value = basicformSchema
          const dept = data.record
          //const dept = await getUserInfo(data.record.id)
          setFieldsValue({ ...data.record })
        } else {
          shc.value = formSchema
        }
      },
    )
    /** 标题初始化 */
    const getTitle = computed(() =>
      !unref(isUpdate) ? '新增员工' : '编辑员工',
    )

    /** 提交按钮 */
    async function handleSubmit() {
      try {
        const values = await validate()
        setModalProps({ confirmLoading: true })
        store.submitInfo(isUpdate, values, closeModal)
        emit('success')
      } finally {
        setModalProps({ confirmLoading: true })
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit }
  },
})
</script>
