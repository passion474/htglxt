<template>
  <PageWrapper :title="getTitle" @back="goBack">
    <Description @register="register" class="mt-4" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getStrategyApi } from '@service/tenant/tenant/strategy'
import { Description, useDescription } from '@/components/Description'
import { detailSchema } from './strategy.data'
import { useRoute } from 'vue-router'
import { StrategyIndexGo } from '@enums/tenant'
import { useTabs } from '@/hooks/web/useTabs'
import { PageWrapper } from '@/components/Page'
import { DescItemSizeEnum } from '@admin/tokens'
import { useUserStore } from '@/store/user'

export default defineComponent({
  components: { Description, PageWrapper },
  setup() {
    const route = useRoute()
    const { setTitle } = useTabs()
    const getTitle = ref('源策略详情')

    const [register, { setDescProps }] = useDescription({
      title: '源策略详情',
      schema: detailSchema,
      column: DescItemSizeEnum.DEFAULT,
    })

    onMounted(async () => {
      const id = route.params.id as string | number
      const data = await getStrategyApi(id)
      setDescProps({ data: data })
      getTitle.value = '源策略详情:' + data?.name
      setTitle(getTitle.value)
    })

    /** 返回源策略主页 */
    function goBack() {
      useUserStore().getRoutePath(StrategyIndexGo)
    }

    return { register, getTitle, goBack }
  },
})
</script>
