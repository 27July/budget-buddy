import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ChartBarStacked, Wallet, Repeat, Upload, Shield } from "lucide-react";
import CategoryListDialog from "@/components/custom/categoriesListDialog";


export default function SettingsPage() {
    const settings = [
        { icon: Settings, title: "Budgets", onClick: () => {/* open modal */} },
        { icon: ChartBarStacked, title: "Categories", onClick: () => setShowCategories(true) },
        { icon: Wallet, title: "Recurring Expenses", onClick: () => {/* route or modal */} },
        { icon: Repeat, title: "TestTest", onClick: () => {/* route */} },
        { icon: Upload, title: "Export All Transactions", onClick: async () => {
            const res = await window.databaseAPI.exportAllTransactions();
            if (res.success) {
            alert("Data exported successfully!");
            } else {
            alert("Failed to export data: " + res.error);
            }
        }},
        { icon: Shield, title: "TestTest2", onClick: () => {/* modal */} },
        ];

    const [showCategories, setShowCategories] = React.useState(false);
    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center gap-2">Settings</h2>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {settings.map(({ icon: Icon, title, onClick }) => (
            <Card key={title} onClick={onClick} className="cursor-pointer hover:shadow-lg transition">
                <CardHeader className="flex items-center gap-4">
                <Icon className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                {/* Optional: brief description */}
                </CardContent>
            </Card>
            ))}
        </div>
        <CategoryListDialog open={showCategories} onOpenChange={setShowCategories} />
        </div>
    );
    }
