import React from "react";
import { ModelView } from "../component/modelView"; // Import the ModelView component

export const Models = () => {
    // Sample data for models
    const models = [
        { id: 1, title: "Dragon Pawn", image: "https://cdn.thingiverse.com/renders/a9/50/90/e1/c1/393e99692a609936da0911dea2c7ea2b_display_large.jpg", description: "A mighty dragon for your adventures." },
        { id: 2, title: "Wandering Knight", image: "https://cdn.thingiverse.com/renders/d0/2c/9c/f3/ff/b3b622eaf113603bb7e847b3166e4abc_display_large.jpg", description: "A brave knight to guard the realm." },
        { id: 3, title: "Orc Warrior", image: "https://cdn.thingiverse.com/assets/d3/e0/18/1d/b8/large_display_orc_swordsman_base.png", description: "An orc ready for battle." },
        { id: 4, title: "Elven Mage", image: "https://cdn.thingiverse.com/renders/2e/2a/8e/10/45/836b71aba0b94d92bec85274b08f1056_display_large.jpg", description: "A wise mage with arcane powers." },
        { id: 5, title: "Elf Archer", image: "https://cdn.thingiverse.com/assets/2d/01/bd/d8/73/large_display_FemaleArcher.png", description: "An elf archer with deadly precision." },
        { id: 6, title: "D20 (20 Sided Die)", image: "https://cdn.thingiverse.com/renders/49/f3/6b/fe/8a/D20Treb_display_large.jpg", description: "A 20 Sided Die" },
    ];

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">3D Models</h1>
            <div className="row">
                {models.map((model) => (
                    <div key={model.id} className="col-md-4 mb-4">
                        <ModelView model={model} />
                    </div>
                ))}
            </div>
            {/* Add the new H2 at the bottom */}
            <div className="text-center mt-5">
                <h2>More will be added soon!</h2>
            </div>
        </div>
    );
};
