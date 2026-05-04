type FeatureScreenLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const FeatureScreenLayout = ({ className, children }: FeatureScreenLayoutProps) => {
  return <main className={className}>{children}</main>;
};

export default FeatureScreenLayout;

