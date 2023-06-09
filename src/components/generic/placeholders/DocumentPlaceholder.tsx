import React from 'react';

interface PlaceholderProps {
    myKey: number
}

const DocumentPlaceholder = (props: PlaceholderProps) => {
    return (
        <div key={props.myKey} className="border border-neutral-200 shadow rounded-md p-5 max-w-xs w-full mr-6 my-2 ">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-neutral-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-neutral-300 rounded col-span-2"></div>
                            <div className="h-2 bg-neutral-300 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-neutral-300 rounded"></div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-neutral-300 rounded col-span-2"></div>
                            <div className="h-2 bg-neutral-300 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-neutral-300 rounded"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-neutral-300 rounded col-span-2"></div>
                            <div className="h-2 bg-neutral-300 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentPlaceholder;