import React from 'react'
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout'
import GenderChart from '@/components/chart/GenderChart'
import OldChart from '@/components/chart/OldChart'

const page = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-wrap gap-y-4 gap-x-4 px-16 py-12">
        <div className="flex flex-row w-1/3 dark:bg-slate-900 bg-white rounded-xl p-4">
          <GenderChart/>
        </div>
        <div className="flex flex-row dark:bg-slate-900 bg-white rounded-xl p-4">
          <OldChart/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default page