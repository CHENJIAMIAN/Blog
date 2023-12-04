<!-- Comment.vue -->
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { inBrowser } from "vitepress";
import Gitalk from "gitalk";

const commentRef = ref<HTMLElement | null>(null);

const init = () => {
  if (inBrowser) {
    const wrap = document.createElement("div");
    wrap.setAttribute("id", "gitalk-page-container");
    commentRef.value?.appendChild(wrap); // 把组件加入到想加载的地方 // querySelector的节点可自己根据自己想加载的地方设置
    const gitTalk = new Gitalk({
      id: location.pathname, // 可选。默认为 location.href
      owner: "CHENJIAMIAN", // GitHub repository 所有者
      repo: "Blog", // GitHub repo
      clientID: "b267a555f5fd7e4c7bb0", // clientID
      clientSecret: "2c9aa7f2829f36ed7dd0100d2914757e5ebe2b78", // clientSecret
      admin: ["CHENJIAMIAN"], // GitHub repo 所有者
      labels: ["GitTalk"], // GitHub issue 标签
      proxy:
        "https://mellifluous-bombolone-049a57.netlify.app/github_access_token",
      createIssueManually: true, //如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
    });
    gitTalk.render("gitalk-page-container");
  }
};

onMounted(() => {
  init();
});
</script>
<template>
  <div class="commentRef" ref="commentRef">
    <div style="display: flex;justify-content: center; margin-top: 20px;">
        本站总访问量
        <span id="busuanzi_value_site_pv" />
        次 本站访客数
        <span id="busuanzi_value_site_uv" />
        人次
    </div>
  </div>
</template>
