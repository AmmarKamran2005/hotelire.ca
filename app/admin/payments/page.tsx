"use client";

import { usePayments } from "@/hooks/use-mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, FileText } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentsPage() {
  const { data: payments } = usePayments();

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Payments & Invoices
        </h1>
        <p className="text-muted-foreground mt-1">
          Track owner subscriptions and monthly transactions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-emerald-800">
              Total Collected (This Month)
            </p>
            <h3 className="text-3xl font-bold text-emerald-900 mt-2">
              $240.00
            </h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-amber-800">Pending</p>
            <h3 className="text-3xl font-bold text-amber-900 mt-2">
              $30.00
            </h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-white border-rose-100">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-rose-800">
              Failed Transactions
            </p>
            <h3 className="text-3xl font-bold text-rose-900 mt-2">1</h3>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Transaction History</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  #INV-{payment.id}
                </TableCell>
                <TableCell className="font-medium">
                  {payment.ownerName}
                </TableCell>
                <TableCell>{payment.month}</TableCell>
                <TableCell>
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    {payment.method}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hover:text-primary"
                  >
                    <FileText className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
