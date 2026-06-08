'use client';

interface ImageCardProps {
  src?: string;
  alt: string;
  title?: string;
  description?: string;
  gradient: string;
  icon: string;
  height?: string;
  children?: React.ReactNode;
}

export function ImageCard({
  src,
  alt,
  title,
  description,
  gradient,
  icon,
  height = 'h-80',
  children,
}: ImageCardProps) {
  return (
    <div
      className={`relative ${height} rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl group`}
    >
      {/* Image or Gradient Background */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">{icon}</div>
          </div>
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      {(title || description) && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title && <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>}
          {description && (
            <p className="text-white/90 text-sm leading-relaxed">{description}</p>
          )}
        </div>
      )}

      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  );
}
