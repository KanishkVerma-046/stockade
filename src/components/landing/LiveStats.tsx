interface Labels {
  startingBalance: string;
  tradableAssets: string;
  assetClasses: string;
  costToStart: string;
}

const DEFAULT_LABELS: Labels = {
  startingBalance: 'Starting Balance',
  tradableAssets: 'Tradable Assets',
  assetClasses: 'Asset Classes',
  costToStart: 'Cost to Start',
};

interface Props {
  labels?: Labels;
}

export default function LiveStats({ labels = DEFAULT_LABELS }: Props) {
  const stats = [
    { label: labels.startingBalance, value: '$100,000' },
    { label: labels.tradableAssets,  value: '29'       },
    { label: labels.assetClasses,    value: '4'         },
    { label: labels.costToStart,     value: '$0'        },
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
