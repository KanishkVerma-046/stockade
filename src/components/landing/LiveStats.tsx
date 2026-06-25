export default function LiveStats() {
  const stats = [
    { label: 'Starting Balance', value: '$100,000' },
    { label: 'Tradable Assets',  value: '29'       },
    { label: 'Asset Classes',    value: '4'         },
    { label: 'Cost to Start',    value: '$0'        },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
      {stats.map(s => (
        <div key={s.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-semibold text-[#f5f5f5] tabular-nums">
            {s.value}
          </div>
          <div className="text-[12px] text-[#666666] mt-1 font-mono uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
