import React from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Gift, History, TrendingUp, Info } from "lucide-react"
import AnimatedPage from "../../components/AnimatedPage"

export default function MyRewards() {
  const navigate = useNavigate()
  const rewardBalance = 100
  const history = [
    { id: 1, title: "Referral Signup", amount: 50, type: "credit", date: "22 Feb, 2026" },
    { id: 2, title: "Friend First Order", amount: 100, type: "credit", date: "20 Feb, 2026" },
    { id: 3, title: "Used in Order #4591", amount: -50, type: "debit", date: "15 Feb, 2026" },
  ]

  return (
    <AnimatedPage className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#1a1a1a] px-4 py-5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-black dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-black dark:text-white">My Rewards</h1>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-2">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#E07832] to-[#F2994A] rounded-[24px] p-8 text-white shadow-lg relative overflow-hidden mb-6">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 opacity-10">
            <Gift size={140} strokeWidth={1} />
          </div>
          <p className="text-white/80 text-[11px] font-bold uppercase tracking-[1px] mb-1">TOTAL BALANCE</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-5xl font-black tracking-tight">{rewardBalance}</span>
            <span className="text-xl font-bold mt-2 opacity-90">Coins</span>
          </div>
          
          <div className="flex items-center gap-2 bg-black/10 w-fit px-3 py-1.5 rounded-full border border-white/5">
            <Info size={14} className="text-white/80" />
            <p className="text-[10px] text-white/95 font-medium">Expires in 30 days</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div 
            className="bg-white dark:bg-[#1a1a1a] p-5 rounded-[20px] border border-slate-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-95 transition-all" 
            onClick={() => navigate('/user/profile/refer')}
          >
            <TrendingUp size={22} className="text-[#E07832]" strokeWidth={2.5} />
            <span className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-wider">Refer & Earn</span>
          </div>
          <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-[20px] border border-slate-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 shadow-sm">
            <Gift size={22} className="text-[#E07832]" strokeWidth={2.5} />
            <span className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-wider">Redeem</span>
          </div>
        </div>

        {/* History Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
             <History size={18} className="text-slate-400" />
             <h3 className="text-[15px] font-bold text-black dark:text-white">Reward History</h3>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-slate-50 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-50 dark:divide-gray-800">
              {history.map((item) => (
                <div key={item.id} className="p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-bold text-[14px] text-black dark:text-white leading-none">{item.title}</p>
                    <p className="text-[11px] font-medium text-slate-400">{item.date}</p>
                  </div>
                  <div className={`text-[14px] font-bold ${item.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                    {item.type === 'credit' ? `+${item.amount}` : item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
