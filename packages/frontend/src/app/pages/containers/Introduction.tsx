import { Link } from "react-router-dom"
import { AppButton } from "../../../components"

function Introduction() {
  return (<>
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* メインビジュアル / キャッチコピー */}
      <div className="space-y-6 max-w-2xl pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold">
          TypeScript学習者によるポートフォリオ
        </div>

        <ul className="flex flex-col gap-y-4 max-w-10/12 text-left">
          <li>
            <h2 className="text-4xl">BEへの挑戦</h2>
            <p className="text-2xs">Expressの基本パターンを学習</p>
          </li>
          <li>
            <h2 className="text-4xl">フルスタックへの挑戦</h2>
            <p className="text-2xs">
              FEからBEまで動くものを作ってみたいと思い、挑戦しました。
            </p>
          </li>
        </ul>

        <div className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
          <p>
            UIデザインは学習範囲外のため、AI生成を用いています
          </p>
        </div>
      </div>

      {/* リンク */}
      <div className="flex flex-col items-center gap-4">
        <Link to="/login">
          <AppButton variant="primary" className="w-auto">
            Login / SignUp
          </AppButton>
        </Link>

        <a
          href={"https://github.com/fujitashuichi/shared-driven-layered-ddd"}
          target="_blank" rel="noreferrer noopener"
        >
          <AppButton variant="primary" className="w-fit">
            ❐ GitHub
          </AppButton>
        </a>
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
