import React, {useState} from 'react';
import AnimatedIconButton from "@/components/buttons/AnimatedIconButton";
import {AiOutlinePlus} from "react-icons/all";
import {BreadCrumbs} from "@/components/breadcrumbs/Breadcrumbs";
import Dropdown from "@/components/Dropdown/Dropdown";
import TextareaInputField from "@/components/input-fields/TextareaInputField";
import DoubleRadioButtons from "@/components/buttons/DoubleRadioButtons";
import DocumentInput from "@/components/document/DocumentInput";
import CreateProjectInputField from "@/components/input-fields/CreateProjectInputField";
import Multiselect from "@/components/select/Multiselect";
import {Investor} from "@prisma/client";
import {GetStaticProps} from "next";
import axios from "axios";
import {LoadingAnimation} from "@/components/loading-animation/LoadingAnimation";
import {useRouter} from "next/router";
import useAlert from "@/hooks/AlertHook";

interface Option {
    label: string;
    value: any;
}

const CreateProject = ({investors}: InvestorsPageProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [projectName, setProjectName] = useState<string>("");
    const [selectedConstructionType, setSelectedConstructionType] = useState<Option>({label: "Mixed", value: "1"});
    const [description, setDescription] = useState<string>("");
    const [selectedEnvironmentImpact, setSelectedEnvironmentImpact] = useState<Option>({label: "No", value: false});
    const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
    const [selectedInvestors, setSelectedInvestors] = useState<Option[]>([]);
    const {setAlert} = useAlert();

    const options = investors.map((investor: Investor) => {
        return {value: investor, label: investor.name}
    });

    const handleDropdownChange = (option: Option): void => {
        setSelectedConstructionType(option);
    };
    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };
    const handleRadioChange = (option: any) => {
        setSelectedEnvironmentImpact(option);
    };
    const handleDocumentChange = (file: File | null) => {
        setSelectedDocument(file);
    };
    const handleProjectNameChange = (value: string) => {
        setProjectName(value);
    };
    const handleSelectedInvestors = (investors: Option[]) => {
        setSelectedInvestors(investors);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const documentUrl = await fetch('api/documents', {
                method: 'POST',
                body: selectedDocument,
            });

            const data = {
                smartContractAddress: "1231223123",
                constructionTitle: projectName,
                constructionImpactsEnvironment: selectedEnvironmentImpact.value,
                constructionType: selectedConstructionType.label,
                dpdUrl: documentUrl,
                investors: {connect: selectedInvestors.map((investor) => ({id: investor.value.id}))}
            }

            const response = await fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error occurred');
            }

            const result = await response.json();
            console.log(result);
            // @ts-ignore
            await router.push('/projects');
            setAlert({title: 'Project created!', message: 'You can now view it in projects.', type: 'success'});
            setIsLoading(false);
        } catch (error: any) {
            // @ts-ignore
            setAlert({title: '', message: error, type: 'error'});
            // Handle the error appropriately
        }
    };

    return (<div>
            {isLoading ?
                <LoadingAnimation/> : null
            }
            <div className="px-40 mb-20">
                <BreadCrumbs/>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Create project</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <CreateProjectInputField label={"Project Name"} onChange={handleProjectNameChange}/>
                                </div>

                                <div className="col-span-full">
                                    <TextareaInputField instructions={"Describe your project"}
                                                        onChange={handleDescriptionChange} title={"Description"}/>
                                </div>
                                <div className="col-span-full flex space-x-4">
                                    <div className="w-1/3">

                                        <Dropdown label={"Construction Type"} onChange={handleDropdownChange}
                                                  options={[{value: "1", label: "Mixed"}, {
                                                      value: "2",
                                                      label: "Mixed"
                                                  }, {value: "3", label: "Mixed"}]}/>

                                    </div>
                                    <div className="w-1/5">
                                        <DoubleRadioButtons label={"Environment Impact"}
                                                            options={[{value: true, label: "Yes"}, {
                                                                value: false,
                                                                label: "No"
                                                            }]}
                                                            onRadioChange={handleRadioChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-xl font-semibold leading-7 text-gray-900">Investors</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Add required entities to your
                                project.</p>

                            <div className="mt-10 ">
                                <Multiselect options={options} onChange={handleSelectedInvestors}/>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <DocumentInput
                                description={"Add DPP document, if you already have it prepared, otherwise you can always add it later on project details."}
                                label={"DPP document"} onDocumentChange={handleDocumentChange}
                                title={"Dokumentacija za pridobitev projektnih pogojev"}/>
                        </div>
                    </div>

                    <div className="mt-6 mb-40 flex items-center justify-end gap-x-6 pb-5">

                        <AnimatedIconButton text={"CREATE"} icon={<AiOutlinePlus/>}
                                            type={"submit"}></AnimatedIconButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface InvestorsPageProps {
    investors: Investor[];
}

export const getStaticProps: GetStaticProps<InvestorsPageProps> = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/investors');
        const investors: Investor[] = response.data;

        return {
            props: {
                investors,
            }
        };
    } catch (error) {
        console.error('Error fetching investors:', error);
        return {
            props: {
                investors: [],
            }
        };
    }
};

export default CreateProject;