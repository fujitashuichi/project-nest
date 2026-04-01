import { Link } from "react-router-dom"
import { AppButton } from "../../../components"

function Introduction() {
  return (<>
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* メインビジュアル / キャッチコピー */}
      <div className="space-y-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase">
          Make UI Simple
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]">
          ボトムアップで<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
            泥臭さを糧に
          </span>
        </h1>
        <div className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
          <p>多層防御に基づいたBEへの挑戦</p>
          <p>状態管理を考えたFEの復習</p>
        </div>
      </div>

      {/* ログインボタン配置エリア */}
      <div className="flex flex-col items-center gap-4">
        <Link to="/login">
          <AppButton variant="primary" className="w-auto">
            Login / SignUp
          </AppButton>
        </Link>
        <p className="text-xs text-slate-400 font-medium">
          アカウントをお持ちでない場合も、こちらから開始できます
        </p>
      </div>

      {/* 装飾 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-100 w-full max-w-4xl">
        {[
          { title: "Layered Defense", desc: "Zod & Domain Validation" },
          { title: "Challenge to Fullstack", desc: "Learn Express & Prisma" },
          { title: "Pure Logic", desc: "Decoupled UI & Logic" }
        ].map((feature, i) => (
          <div key={i} className="space-y-1">
            <dt className="text-sm font-bold text-slate-800">{feature.title}</dt>
            <dd className="text-xs text-slate-400">{feature.desc}</dd>
          </div>
        ))}
      </div>
    </div>
  </>)
}

export default Introduction
