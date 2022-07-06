import { FormSchema } from '@/components/Form'
// import { BasicColumn } from '@/components/Table'
import { DescItem } from '@/components/Description'

/** 表格数据 */
// export const columns: BasicColumn[] = [
//   {
//     title: '工号',
//     dataIndex: 'id',
//     align: 'left',
//     width: 220,
//   },
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     width: 220,
//   },
//   {
//     title: '民族',
//     dataIndex: 'nation',
//     width: 220,
//   },
//   {
//     title: '机构',
//     dataIndex: 'organization',
//     width: 220,
//   },
//   {
//     title: '部门',
//     dataIndex: 'section',
//     width: 220,
//   },
//   {
//     title: '手机号',
//     dataIndex: 'tel',
//     width: 220,
//   },
//   {
//     title: '户籍所在地',
//     dataIndex: 'location',
//     width: 220,
//   },
//   {
//     title: '家庭住址',
//     dataIndex: 'address',
//     width: 220,
//   },
// ]

/** 查询数据 */
// export const searchFormSchema: FormSchema[] = [
//   {
//     label: '员工姓名',
//     field: 'name',
//     component: 'Input',
//     colProps: { span: 6 },
//   },
//   {
//     label: '员工机构',
//     field: 'organization',
//     component: 'Input',
//     colProps: { span: 6 },
//   },
//   {
//     label: '员工部门',
//     field: 'section',
//     component: 'Input',
//     // componentProps: {
//     //   options: dict.DicNormalDisableOptions,
//     //   showSearch: true,
//     //   optionFilterProp: 'label',
//     // },
//     colProps: { span: 6 },
//   },
// ]

/** 表单数据 */
export const formSchema: FormSchema[] = [
  {
    label: '工号',
    field: 'id',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '民族',
    field: 'nation',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '机构',
    field: 'organization',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '部门',
    field: 'section',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '手机号',
    field: 'tel',
    component: 'Input',
    rules: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur',
        required: true,
      },
    ],
    colProps: { span: 24 },
  },
  {
    label: '户籍所在地',
    field: 'location',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '家庭住址',
    field: 'address',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
]
export const basicformSchema: FormSchema[] = [
  {
    label: '工号',
    field: 'id',
    component: 'Input',
    dynamicDisabled: true,
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '民族',
    field: 'nation',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '机构',
    field: 'organization',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '部门',
    field: 'section',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '手机号',
    field: 'tel',
    component: 'Input',
    rules: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur',
        required: true,
      },
    ],
    colProps: { span: 24 },
  },
  {
    label: '户籍所在地',
    field: 'location',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    label: '家庭住址',
    field: 'address',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
]
/** 表单数据 - 角色分配 */
export const roleFormSchema: FormSchema[] = [
  {
    label: '部门Id',
    field: 'id',
    component: 'Input',
    show: false,
    colProps: { span: 12 },
  },
  {
    label: '部门名称',
    field: 'name',
    component: 'Input',
    dynamicDisabled: true,
    colProps: { span: 24 },
  },
  {
    label: '角色分配',
    field: 'roleIds',
    slot: 'role',
    component: 'Input',
  },
]

/** 详情数据 */
export const detailSchema: DescItem[] = [
  {
    label: '父部门id',
    field: 'parentId',
    span: 8,
  },
  {
    label: '部门编码',
    field: 'code',
    span: 8,
  },
  {
    label: '部门名称',
    field: 'name',
    span: 8,
  },
  {
    label: '负责人',
    field: 'leader',
    span: 8,
  },
  {
    label: '联系电话',
    field: 'phone',
    span: 8,
  },
  {
    label: '邮箱',
    field: 'email',
    span: 8,
  },
  {
    label: '显示顺序',
    field: 'sort',
    span: 8,
  },
  {
    label: '状态',
    field: 'status',
    span: 8,
  },
  {
    label: '备注',
    field: 'remark',
    span: 8,
  },
]
export const listTable = [{ name: 'mrq', id: 1 }]
