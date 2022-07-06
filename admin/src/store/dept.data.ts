import { defineStore } from 'pinia'
import { useMessage } from '@/hooks/web/useMessage'
import { deleteUserInfo, editUserInfo, addUserInfo } from '@service/test/test'
import { unref, reactive, computed } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
const { createMessage, createConfirm } = useMessage()
// 第一个参数是应用程序中 store 的唯一 id
export const useDeptStore = defineStore('deptdata', {
  // 其它配置项

  state: () => ({
    columns: [
      {
        title: '工号',
        dataIndex: 'id',
        align: 'left',
        width: 220,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 220,
      },
      {
        title: '民族',
        dataIndex: 'nation',
        width: 220,
      },
      {
        title: '机构',
        dataIndex: 'organization',
        width: 220,
      },
      {
        title: '部门',
        dataIndex: 'section',
        width: 220,
      },
      {
        title: '手机号',
        dataIndex: 'tel',
        width: 220,
      },
      {
        title: '户籍所在地',
        dataIndex: 'location',
        width: 220,
      },
      {
        title: '家庭住址',
        dataIndex: 'address',
        width: 220,
      },
    ],
    searchFormSchema: [
      {
        label: '员工姓名',
        field: 'name',
        component: 'Input',
        colProps: { span: 6 },
      },
      {
        label: '员工机构',
        field: 'organization',
        component: 'Input',
        colProps: { span: 6 },
      },
      {
        label: '员工部门',
        field: 'section',
        component: 'Input',
        // componentProps: {
        //   options: dict.DicNormalDisableOptions,
        //   showSearch: true,
        //   optionFilterProp: 'label',
        // },
        colProps: { span: 6 },
      },
    ],
  }),
  actions: {
    /** 删除按钮 */
    handleDelete(record, reload) {
      const delIds = record.id
      const delNames = record.name
      if (!record.id) {
        createMessage.warning('请选择要操作的数据！')
      } else {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '是否确定要删除' + delNames + '?',
          onOk: () =>
            deleteUserInfo({ id: delIds }).then(() => {
              createMessage.success('删除' + delNames + '成功！')
              reload()
            }),
        })
      }
    },
    /** 提交信息操作 */
    async submitInfo(isUpdate, values, closeModal) {
      unref(isUpdate)
        ? await editUserInfo(values).then(() => {
            closeModal()
            createMessage.success('编辑人员成功！')
            console.log(values)
          })
        : await addUserInfo(values).then((res) => {
            if (res.code === 200) {
              closeModal()
              createMessage.success('新增人员成功！')
            } else {
              createMessage.error('新增人员失败！')
            }
          })
    },
  },
})
