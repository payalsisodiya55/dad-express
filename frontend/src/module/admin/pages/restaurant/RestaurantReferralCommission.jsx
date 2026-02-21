import { useState } from "react";
import { Save, Gift, Info, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RestaurantReferralCommission() {
  const [commission, setCommission] = useState("5");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Restaurant Referral Commission settings updated successfully!");
    }, 800);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Restaurant Referral Commission</h2>
              <p className="text-sm text-slate-500 font-medium">Configure global rewards for restaurant-to-restaurant referrals</p>
            </div>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-100"
          >
            {isSaving ? "Saving..." : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Main Setting Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex-1">
                <p className="text-sm text-amber-900 font-semibold leading-relaxed">
                  Important UX Rule:
                </p>
                <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                  This commission will apply <span className="font-bold underline">ONLY</span> to the referrer restaurant's first order when a new restaurant joins via their referral code. After the first order, normal commission rates will automatically apply.
                </p>
              </div>
            </div>

            <div className="max-w-md space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Referral Commission (%)</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="h-12 border-slate-200 rounded-xl focus:ring-blue-600 pl-4 pr-12 text-lg font-bold"
                    placeholder="5"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    %
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Specify the percentage commission the referrer will receive on their next (first) order.</p>
              </div>

              <div className="space-y-2 opacity-70">
                <Label className="text-sm font-bold text-slate-700">Apply On</Label>
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-slate-600">First Order Only</span>
                </div>
                <p className="text-xs text-slate-400 font-medium italic">This is a system-wide rule for simple referral automation.</p>
              </div>
            </div>
          </div>

          {/* Quick Stats / Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Referral Side</h4>
              <p className="text-sm text-slate-700 font-medium">Restaurant A shares code → Restaurant B signups → A gets {commission || '0'}% commission on their VERY NEXT order.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Referred Side</h4>
              <p className="text-sm text-slate-700 font-medium">Restaurant B (the new joiner) will always have standard commission applied from day one.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
