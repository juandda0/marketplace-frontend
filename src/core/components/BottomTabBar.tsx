import { NavLink, useLocation } from 'react-router-dom';
import { isTabActive, tabs } from './navigation';

const BottomTabBar = () => {
    const { pathname } = useLocation();

    return (
        <nav
            aria-label="Navegación principal"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-bg/85 pb-safe backdrop-blur-xl md:hidden"
        >
            <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
                {tabs.map((tab) => {
                    const active = isTabActive(tab, pathname);
                    const Icon = active ? tab.activeIcon : tab.icon;
                    return (
                        <li key={tab.to}>
                            <NavLink
                                to={tab.to}
                                aria-current={active ? 'page' : undefined}
                                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                                    active ? 'text-primary' : 'text-subtle hover:text-muted'
                                }`}
                            >
                                {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" aria-hidden />}
                                <Icon className="h-[22px] w-[22px]" aria-hidden />
                                {tab.label}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default BottomTabBar;
