import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"文件整理","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"电脑知识/文件整理.md","filePath":"电脑知识/文件整理.md"}');
const _sfc_main = { name: "电脑知识/文件整理.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="文件整理" tabindex="-1">文件整理 <a class="header-anchor" href="#文件整理" aria-label="Permalink to &quot;文件整理&quot;">​</a></h1><p>提供的方法仅供参考</p><h2 id="层级编码-杜威十进分类法-ddc" tabindex="-1">层级编码/杜威十进分类法（DDC） <a class="header-anchor" href="#层级编码-杜威十进分类法-ddc" aria-label="Permalink to &quot;层级编码/杜威十进分类法（DDC）&quot;">​</a></h2><p>发明人：梅尔维尔・杜威（Melvil Dewey），图书馆用的经典分类系统</p><p><strong>示例</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>100 哲学与心理学（大类）</span></span>
<span class="line"><span>110 形而上学（100下面子类）</span></span>
<span class="line"><span>120 认识论</span></span>
<span class="line"><span>130 超心理学</span></span>
<span class="line"><span>……</span></span>
<span class="line"><span>200 宗教（另一个大类）</span></span></code></pre></div><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><p><strong>GB/T 2260行政区划代码（身份证前6位）</strong></p><p><code>44</code>广东——<code>4401</code>广州——<code>440105</code>海珠区，高位代表上级，低位代表下级</p><p><strong>可能的误会</strong></p><p>我国特服电话（110、120、119）不采用杜威十进分类法</p><p><code>11×</code>：紧急报警类号段；<code>12×</code>：公益服务；<code>123XX</code>政务热线</p><p>历史原因：老式转盘电话，<code>11</code>开头拨号步数少，优先分配给紧急业务，追求好记、拨号快，不是做层级分类</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("电脑知识/文件整理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ____ as default
};
