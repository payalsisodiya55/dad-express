import { Search, Download, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const MAPPINGS = [
  { id: 1, referrer: "Cafe Coffee Day", referred: "The Burger Club", date: "21 Feb 2026", commission: "5%", progress: "0/1", status: "Pending" },
  { id: 2, referrer: "Pizza Hut", referred: "Taco Bell", date: "20 Feb 2026", commission: "5%", progress: "1/1", status: "Completed" },
  { id: 3, referrer: "Subway", referred: "KFC", date: "19 Feb 2026", commission: "5%", progress: "1/1", status: "Completed" },
  { id: 4, referrer: "Dominos", referred: "Biryani Blues", date: "18 Feb 2026", commission: "5%", progress: "0/1", status: "Pending" },
];

export default function RestaurantReferralMapping() {
  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Info Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Current Referral Policy</h3>
              <p className="text-xs text-slate-500 font-medium">Commission: <span className="text-blue-600 font-black">5%</span> | Applies On: <span className="text-blue-600 font-black">First Order Only</span></p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
             <span className="text-xs font-bold text-slate-600">Total Referrals:</span>
             <span className="text-sm font-black text-slate-900">{MAPPINGS.length}</span>
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardHeader className="p-6 pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-black text-slate-800 tracking-tight">Restaurant Referral Mapping</CardTitle>
                <p className="text-xs text-slate-400 font-medium mt-1">Track rewards and signup sources for all restaurants</p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search Referrer or Referred..." 
                    className="pl-9 h-10 border-slate-200 rounded-xl focus-visible:ring-blue-600 font-medium text-sm"
                  />
                </div>
                <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 flex items-center gap-2 font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 text-xs">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 pb-6 pt-2 overflow-x-auto">
              <Table>
                <TableHeader className="bg-transparent border-b border-slate-100">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">REFERRER & REFERRED</TableHead>
                    <TableHead className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">JOINED DATE</TableHead>
                    <TableHead className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">COMMISSION</TableHead>
                    <TableHead className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">PROGRESS</TableHead>
                    <TableHead className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MAPPINGS.map((map) => (
                    <TableRow key={map.id} className="border-b border-slate-50 group transition-colors hover:bg-slate-50/50">
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                           <div className="flex flex-col">
                              <span className="font-bold text-sm text-slate-800 tracking-tight">{map.referrer}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Referrer</span>
                           </div>
                           <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                           <div className="flex flex-col">
                              <span className="font-medium text-sm text-slate-600">{map.referred}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Referred</span>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 font-bold text-xs text-slate-500">{map.date}</TableCell>
                      <TableCell className="py-4 px-4">
                        <span className="font-black text-sm text-blue-600">{map.commission}</span>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="space-y-1.5 w-24">
                          <div className="flex items-center justify-between text-[10px] font-black text-slate-400">
                             <span>{map.progress} Orders</span>
                             <span>{map.status === 'Completed' ? '100%' : '0%'}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-500 ${map.status === 'Completed' ? 'bg-green-500 w-full' : 'bg-blue-400 w-0'}`}
                             />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider ${
                          map.status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {map.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
