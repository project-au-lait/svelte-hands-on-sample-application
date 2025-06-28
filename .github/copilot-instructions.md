# Copilot Instructions

## コンポーネント構成

- Page: ページを表すUIコンポーネント　+page.svelteファイルで実装
- PageLoader: Pageの遷移時の初期データをロードする処理を担うコンポーネント　+page.tsファイルで実装
- Model: データ構造を表すコンポーネント　{データ名}Modelという名前のinterfaceを{データ名}.tsファイル内でinterfaceとして実装
- Form: Modelの入力フォームを表すUIコンポーネント　登録ページ、更新ページで使用される　{データ名}Form.svelteファイルで実装
- Client: API callを担うコンポーネント　{データ名}Client.tsファイルで実装
- RestClient: API callの共通処理を担うコンポーネント　全てのClientから使用される

## ディレクトリ構成

- `src/lib`: ライブラリや共通処理を格納するディレクトリ
- `src/lib/arch`: アーキテクチャに関する共通処理を格納するディレクトリ
- `src/lib/domain/{domain}`: ドメインごとの共通処理を格納するディレクトリ
- `src/routes`: ページを格納するディレクトリ
- `src/routes/(user)`: 利用者向けのページを格納するディレクトリ
- `src/routes/shop`: 店舗向けのページを格納するディレクトリ
- 特にModelのCRUD処理に関するディレクトリ構成は以下のようになります。
  - `src/routes/xxx/{model}`: Modelを一覧表示するページの+page.svelte、+page.tsファイルを格納
  - `src/routes/xxx/{model}/new`: Modelを登録するページの+page.svelte、+page.tsファイルを格納
  - `src/routes/xxx/{model}/[{modelId}]`: Modelを更新するページの+page.svelte、+page.tsファイルを格納

## Svelte v5 Runes 使用ルール

フロントエンドは Svelte v5 を使用しています。以下のルールに従ってルーン記法（runes syntax）を使用してください。

### 🔰 基本原則

* 状態管理や副作用は **ルーンAPI（runes）** を用いて記述します。
* `$:` のような旧来の reactive 宣言は使わず、`$effect` / `$derived` を使用します。

### $state

リアクティブな変数を定義する場合は、$stateを使用します。

**OK:**
```svelte
<script lang="ts">
let count = $state(0);
</script>

<button onclick={() => count++}>
  clicks: {count}
</button>
```

**NG:**
```svelte
<script lang="ts">
  let count = 0;
</script>

<button onclick={() => count++}>
  clicks: {count}
</button>
```


参考: [\$state](https://svelte.dev/docs/svelte/$state)

### $derived

`$derived` は、他の状態変数から計算される値を定義するために使用します。依存する値が変化したときのみ再計算されます。

**OK:**
```svelte
<script>
  const count = $state(2);
  const double = $derived(() => count * 2);
</script>

<p>count: {count}</p>
<p>double: {double}</p>
```

**NG:**
```svelte
<script>
  let count = $state(2);
  let double = $: count * 2;
</script>

<p>count: {count}</p>
<p>double: {double}</p>
```

**ポイント:**
- `$derived` 内では依存する `$state` 変数を参照できます。
- `$:` の代わりに `$derived` を使い、計算コストの高い式や複数の値の合成に利用します。(`$:`はSvelte v5より前からサポートされている構文です)

参考: [\$derived](https://svelte.dev/docs/svelte/$derived)

### $effect

`$effect`は、特定の副作用処理やリアクティブな挙動を管理するための関数です。
主に状態の変化や外部リソースへのアクセスなど、コンポーネントのライフサイクルに関連する処理を記述する際に使用します。

**OK:**
```svelte
<script lang="ts">
  let size = $state(50);
  let color = $state('#ff3e00');

  let canvas;

  $effect(() => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // this will re-run whenever `color` or `size` change
    context.fillStyle = color;
    context.fillRect(0, 0, size, size);
  });
</script>
```


**NG:**
```svelte
<script lang="ts">
  let size = $state(50);
  let color = $state('#ff3e00');

  let canvas;

  $: {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // this will re-run whenever `color` or `size` change
    context.fillStyle = color;
    context.fillRect(0, 0, size, size);
  };
</script>
```

### $props

`$props`は親コンポーネントから渡されるプロパティのオブジェクト。各プロパティはコンポーネントの動作や表示内容を制御します。

**App.svelte:**
```svelte
<script lang="ts">
  import MyComponent from './MyComponent.svelte';
</script>

<MyComponent adjective="cool" />
```

**OK MyComponent.svelte:**
```svelte
<script lang="ts">
  let { adjective = '' } = $props();
</script>

<p>this component is {adjective}</p>
```


**NG MyComponent.svelte:**
```svelte
<script lang="ts">
  export let adjective = '';
</script>

<p>this component is {adjective}</p>
```

### $props Complex

**App.svelte:**
```svelte
<script lang="ts">
  import MyComponent from './MyComponent.svelte';

  function func(param : string) {
    console.log(param);
  }
</script>

<MyComponent str="abc" num={3} fun={func} />
```

**OK MyComponent.svelte:**
```svelte
<script lang="ts">
  interface Props {
    str: string;
    num: number;
    fun: (param: string) => void;
  }
  let { str = '', num, fun } : Props = $props();
</script>
```

### $props with Loading data

SvelteKitの`PageLoad`を使用してページの初期データをロードする場合、`$props`は`PageProps`型を使用してデータを受け取ります。

**/src/routes/users/[userId]/+page.ts**
```ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
    userId: params.userId
	};
};
```

**OK: /src/routes/users/[userId]/+page.svelte**
```svelte
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
  const userId: string = data.userId;
</script>

<h1>{userId}</h1>
```

**NG: /src/routes/users/[userId]/+page.ts**
```svelte
<script lang="ts">
	export let userId;
</script>

<h1>{userId}</h1>
```


### $bindable

`$bindable` は、親コンポーネントから双方向バインディングを許可したいプロパティに使用します。これにより、親から渡された値を子コンポーネント内で変更でき、変更が親にも反映されます。

**App.svelte:**
```svelte
<script lang="ts">
  import InputComponent from './InputComponent.svelte';
  let value = 'hello';
</script>

<InputComponent bind:value />
<p>{value}</p>
```

**OK InputComponent.svelte:**
```svelte
<script lang="ts">
  let { value = $bindable() } = $props();
</script>

<input bind:value>
```

**NG InputComponent.svelte:**
```svelte
<script lang="ts">
  export let value = '';
</script>

<input bind:value>
```

**ポイント:**
- `$bindable` を使うことで、親子間で値の同期が可能になります。
- `$state` では親からのバインディングはできません。双方向バインディングが必要な場合は必ず `$bindable` を使います。

参考: [$bindable](https://svelte.dev/docs/svelte/$bindable)

## CSS 実装ルール

HTMLのstyle属性は原則使用しないでください。
すべてのスタイルはstyleタグ内に記述してください。

### CSS フレームワーク

このプロジェクトでは、軽量でミニマルな CSS フレームワークである PicoCSS をベースにスタイルを実装しています。
よって以下のようなスタイル方針に従ってください。

- HTML セマンティクスを活かしたクラスレス設計を優先
- 可能な限り section, article, nav, form, button, input などのネイティブ HTML 要素を活用
- class 属性の使用は最小限にし、PicoCSS の設計意図に沿ったシンプルなマークアップを保つ
- JavaScript やカスタム CSS を使う場合も、PicoCSS のスタイルと整合性が取れるように配慮

必要に応じてPico CSSの公式ドキュメントを参照してください。

https://picocss.com/docs
