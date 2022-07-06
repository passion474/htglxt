<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button :preIcon="IconEnum.ADD" @click="handleCreate" type="primary">
          新增
        </a-button>
      </template>

      <template #action="{ record }">
        <!-- /*操作中的按钮*/ -->
        <TableAction
          :actions="[
            {
              icon: IconEnum.EDIT,
              tooltip: '编辑',
              //auth: DeptAuth.EDIT,
              onClick: handleEdit.bind(null, record),
            },

            {
              icon: IconEnum.DELETE,
              tooltip: '删除',
              //auth: DeptAuth.DELETE,
              color: 'error',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  addUserInfo,
  deleteUserInfo,
  editUserInfo,
  getUserInfo,
} from '@service/test/test'
import { useModal } from '@/components/Modal'
import { useMessage } from '@/hooks/web/useMessage'
import { IconEnum } from '@admin/tokens'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { DeptAuth } from '@auth/system'
import DeptModal from './DeptModal.vue'
import { DeptDetailGo } from '@enums/system'
import { useDeptStore } from '@/store/dept.data'
import { ref } from 'vue'
import { BasicColumn } from '@/components/Table'
import { FormSchema } from '@/components/Form'

export default defineComponent({
  name: 'DeptManagement',
  components: { BasicTable, DeptModal, TableAction },
  setup() {
    //store
    const store = useDeptStore()
    const columns: BasicColumn[] = ref(store.columns)
    const searchFormSchema: FormSchema[] = ref(store.searchFormSchema)
    //end
    const { createMessage, createConfirm } = useMessage()
    const [registerModal, { openModal }] = useModal()
    const [registerRoleModal, { openModal: openRoleModal }] = useModal()
    const state = reactive<{
      ids: (string | number)[]
      idNames: string
    }>({
      ids: [],
      idNames: '',
    })
    const [registerTable, { reload, expandAll, collapseAll }] = useTable({
      title: '员工列表',
      api: getUserInfo,
      // dataSource:listTable,
      striped: false,
      useSearchForm: true,
      rowKey: 'id',
      bordered: true,
      showIndexColumn: true,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      isTreeTable: true,
      pagination: true,
      canResize: false,
      showTableSetting: true,
      tableSetting: {
        fullScreen: true,
      },
      actionColumn: {
        width: 220,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
      // rowSelection: {
      //   onChange: (selectedRowKeys, selectRows) => {
      //     state.ids = selectedRowKeys
      //     state.idNames = selectRows
      //       .map((item) => {
      //         return item.name
      //       })
      //       .join(',')
      //   },
      // },
    })

    /** 新增按钮 */
    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      })
    }

    /** 修改按钮 */
    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      })
    }

    /** 删除按钮 */
    function handleDelete(record: Recordable) {
      store.handleDelete(record, reload)
    }

    function handleSuccess() {
      reload()
    }
    console.log(
      getUserInfo().then((res) => {
        console.log('res:', res)
      }),
    )
    return {
      IconEnum,
      DeptAuth,
      registerTable,
      registerModal,
      registerRoleModal,
      expandAll,
      collapseAll,
      handleCreate,
      handleDelete,
      handleEdit,
      handleSuccess,
    }
  },
})
</script>
